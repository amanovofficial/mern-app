import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { UserModel } from "../models/User";
import { validationResult, Result, ValidationError } from "express-validator";
import keys from "../config/keys.dev";
const { JWT_SECRET_KEY } = keys

export const register = async (req: Request, res: Response): Promise<void> => {

    const postData: { name: string; password: string; phoneNumber: string } = {
        name: req.body.name,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber
    }
    const errors: Result<ValidationError> = validationResult(req)
    try {
        if (!errors.isEmpty()) {
            throw Error(errors.array().map(err => err.msg).join(', '))
        }
        const user = await UserModel.findOne({ phoneNumber: postData.phoneNumber })

        if (user) throw Error('Пользователь с таким номером уже существует, введите другой номер')

        const salt = await bcrypt.genSalt(10)
        if (!salt) throw Error('Произошла ошибка при создании salt')

        const hash = await bcrypt.hash(postData.password, salt)
        if (!hash) throw Error('Произошла ошибка при хэшировании пароля')

        const newUser = new UserModel({
            name: postData.name,
            password: hash,
            phoneNumber: postData.phoneNumber
        })

        const savedUser = await newUser.save()
        if (!savedUser) throw Error('Произошла ошибка при сохранении пользователя в БД')

        const token = jwt.sign({ id: savedUser._id }, JWT_SECRET_KEY, { expiresIn: 3600 })

        res.status(201).json({
            token,
            user: {
                id: savedUser._id,
                name: savedUser.name,
                phoneNumber: savedUser.phoneNumber
            }
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

export const login = async (req: Request, res: Response): Promise<void> => {

    const phoneNumber: string = req.body.phoneNumber
    const password: string = req.body.password

    const errors: Result<ValidationError> = validationResult(req)
    try {
        if (!errors.isEmpty()) throw Error(errors.array().map(err => err.msg).join(', '))

        const user = await UserModel.findOne({ phoneNumber })
        if (!user) throw Error('Пользователь с таким номером не найден')

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) throw Error('Введень неправильный пароль')

        const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, { expiresIn: 3600 })

        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                phoneNumber: user.phoneNumber
            }
        });

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

export const getUser = async (req: Request, res: Response): Promise<void> => {

    const user = await UserModel.findById(res.locals.user.id).select('-password')
    if (!user) res.status(404).json({ message: 'Пользователь не найден' })

    res.json(user)
}