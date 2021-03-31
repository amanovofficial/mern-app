import { Response } from "express";
import getPageInfo from "../utils/pagination/getPageInfo";
import { PaginateResult } from "mongoose";
import { IPageInfo } from "../types/db/Pagination";
import IQuery from "../types/users/IQuery";
import { IUser, UserModel } from "../models/User";
import AdModel from "../models/Ad";
import deleteFiles from "../utils/ads/deleteFiles";

export const getUsers = async (req: any, res: Response) => {

    const page: number = parseInt(req.query.page) || 1 //номер страницы
    const name: string = req.query.name
    let phoneNumber: string = req.query.phoneNumber
    const isBlocked: boolean = req.query.isBlocked === 'false' ? false : true
    const options = {
        page,
        sort: { name: -1 },//условия сортировки
        limit: 6,//количество элементов в каждом результате запроса
        collation: {
            locale: 'en'
        },
        select: '-password'
    }

    const query: IQuery = { role: 'user' }
    if (name) {
        query.name = name
    }

    if (phoneNumber) {
        let splittedPhoneNumber = phoneNumber.split('')
        splittedPhoneNumber.shift()
        splittedPhoneNumber.unshift('+')
        query.phoneNumber = splittedPhoneNumber.join('')
    }

    if (req.query.isBlocked) {
        query.isBlocked = isBlocked
    }

    try {
        const paginateResult: PaginateResult<any> = await UserModel.paginate(query, options)
        const pageInfo: IPageInfo = getPageInfo(paginateResult)
        res.status(200).json({
            users: paginateResult.docs,
            pageInfo
        })
    } catch (error) {
        console.log(error)
        res.json({ message: error.message })
    }
}

export const remove = async (req: any, res: Response) => {
    try {
        const user: IUser = await UserModel.findById(req.params.id)
        if (!user) throw Error('Объявление не найдено в базе')
        const userAds: any[] = await AdModel.find({ userID: user._id }).select('images')
        const allImages: string[] = []
        userAds.forEach(ad => {
            allImages.push(...ad.images)
        })
        deleteFiles(allImages, (err) => {
            if (err) {
                throw Error('Произошла ошибка при удалении фотографии объявлений данного пользователя')
            }
        })
        await AdModel.deleteMany({ userID: user._id })
        await UserModel.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Пользователь успешно удален!' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const blockingOrUnblockingUser = async (req: any, res: Response) => {
    try {
        const id: string = req.params.id
        const isBlocked: boolean = req.body.isBlocked
        const options = { new: true, select: '-password' }
        const updatedUser = await UserModel.findByIdAndUpdate(id, { $set: { isBlocked } }, options)
        res.status(200).json({ user: updatedUser })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Произошла ошибка при обработке запроса' })
    }
}