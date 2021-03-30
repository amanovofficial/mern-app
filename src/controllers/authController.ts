import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { IUser, UserModel } from "../models/User";
import { validationResult, Result, ValidationError } from "express-validator";
import errorHandler from "../utils/validations/errorHandler";
import config from "../config";
const { JWT_SECRET_KEY } = config

export const register = async (req: Request, res: Response): Promise<void> => {

    const { role, name, password, phoneNumber }: IUser = req.body

    const errors: Result<ValidationError> = validationResult(req)
    try {
        errorHandler(errors)

        if (role === 'admin') {
            const admin: IUser = await UserModel.findOne({ role: 'admin' })
            if (admin) throw Error('В системе уже создан учетный запись администратора')
        }

        const user: IUser = await UserModel.findOne({ phoneNumber })

        if (user) throw Error('Пользователь с таким номером уже существует, введите другой номер')

        const salt: string = await bcrypt.genSalt(10)
        if (!salt) throw Error('Произошла ошибка при создании salt')

        const hash: string = await bcrypt.hash(password, salt)
        if (!hash) throw Error('Произошла ошибка при хэшировании пароля')

        const newUser: IUser = new UserModel({
            role,
            name,
            password: hash,
            phoneNumber
        })

        const savedUser: IUser = await newUser.save()
        if (!savedUser) throw Error('Произошла ошибка при сохранении пользователя в БД')

        const token: string = jwt.sign({ id: savedUser._id, role: savedUser.role }, JWT_SECRET_KEY, { expiresIn: 3600 })

        res.status(201).json({
            token,
            user: {
                id: savedUser._id,
                role: savedUser.role,
                name: savedUser.name,
                phoneNumber: savedUser.phoneNumber
            }
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

export const login = async (req: Request, res: Response): Promise<void> => {

    const { phoneNumber, password }: IUser = req.body
    const errors: Result<ValidationError> = validationResult(req)
    try {
        errorHandler(errors)

        const user: IUser = await UserModel.findOne({ phoneNumber })
        if (!user) throw Error('Пользователь с таким номером не найден')
        if (user.isBlocked) throw Error('Ваш аккаунт заблокирован, администратором сайта')
        const isMatch: boolean = await bcrypt.compare(password, user.password)

        if (!isMatch) throw Error('Введень неправильный пароль')

        const token: string = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET_KEY, { expiresIn: 3600 })

        res.status(200).json({
            token,
            user: {
                id: user._id,
                role: user.role,
                name: user.name,
                phoneNumber: user.phoneNumber
            }
        });

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

export const getUser = async (req: Request, res: Response): Promise<void> => {

    const user: IUser = await UserModel.findById(res.locals.user.id)
    if (!user) res.status(404).json({ message: 'Пользователь не найден' })

    res.json({
        id: user._id,
        role: user.role,
        name: user.name,
        phoneNumber: user.phoneNumber
    })
}