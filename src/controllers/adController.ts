import { Response } from "express";
import IQuery from "../types/db/IQuery";
import IQueryOptions from "../types/db/IQueryOptions";
import AdModel, { IAd } from "../models/Ad";
import { IUser, UserModel } from "../models/User";
import transformToMongoQuery from "../utils/db/transformToMongoQuery";
import transformReqBodyToAdObject from "../utils/ads/transformReqBodyToAdObject";
import getPageInfo from "../utils/pagination/getPageInfo";
import deleteFiles from "../utils/ads/deleteFiles";
import { validationResult, Result, ValidationError } from "express-validator";
import { PaginateResult } from "mongoose";
import IUpdatableAdFields from "../types/ads/IUpdatableAdFields";
import getImageNamesFromRequest from "../utils/ads/getImageNamesFromRequest";
import { IPageInfo } from "../types/db/Pagination";
import errorHandler from "../utils/validations/errorHandler";

export const create = async (req: any, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req)
    const userID: string = res.locals.user.id
    try {
        errorHandler(errors)
        const ad: IAd = new AdModel(transformReqBodyToAdObject(req, userID))
        await ad.save()
        res.status(201).json({ id: ad._id })
    } catch (error) {
        //  Когда запрос доходит до этого контроллера, файлы будут загружены,
        //  т.к не удалось сохранить объект(ad) в бд, необходимо удалить уже загруженные файлы
        //  объекта из хранилища
        const images: string[] = getImageNamesFromRequest(req)
        deleteFiles(images, (err) => {
            if (err) {
                return res.status(400).json({ message: 'Произошла ошибка при удалении файла' })
            }
            res.status(400).json({ message: error.message })
        })
    }
}

export const getAllAds = async (req: any, res: Response) => {

    let perPage = 5 //количество элементов в каждом результате запроса
    let page = parseInt(req.query.page) || 1 //номер страницы
    const options: IQueryOptions = {
        page,
        sort: { date: -1 },//условия сортировки
        limit: perPage,
        collation: {
            locale: 'en'
        }
    }

    try {
        const query: IQuery = transformToMongoQuery(req, res)
        const paginateResult: PaginateResult<IAd> = await AdModel.paginate(query, options)
        const pageInfo: IPageInfo = getPageInfo(paginateResult)
        res.status(200).json({
            ads: paginateResult.docs,
            pageInfo
        })
    } catch (error) {
        console.log(error)
        res.json({ message: error.message })
    }
}

export const getOneAd = async (req: any, res: Response) => {
    try {
        const ad: IAd = await AdModel.findById(req.params.id)
        if (!ad) throw Error('Объявление с таким id не найдено, возможна она была удалена.')
        res.json({ ad })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getAdAuthor = async (req: any, res: Response): Promise<void> => {
    try {
        const user: IUser = await UserModel.findById(req.params.id)
        if (!user) res.status(404).json({ message: 'Пользователь не найден' })
        const adAuthor: { name: string, phoneNumber: string } = user
        res.json({ adAuthor })
    } catch (error) {
        console.log();
    }
}

export const update = async (req: any, res: Response) => {
    try {
        const errors: Result<ValidationError> = validationResult(req)
        errorHandler(errors)
        const id: string = req.params.id
        const deletedImages: string[] = JSON.parse(req.body.deletedImages)
        // если при редактировании удалены один или несколько фото то удаляем их и с хранилища
        deleteFiles(deletedImages, (err) => {
            if (err) throw Error('Произошла ошибка при удалении файла')
        })
        const update: IUpdatableAdFields = transformReqBodyToAdObject(req)
        const options = { new: true }
        const updatedAd: IAd = await AdModel.findByIdAndUpdate(id, update, options)

        res.status(200).json({ id: updatedAd._id })
    } catch (error) {
        //  Когда запрос доходит до этого контроллера, файлы будут загружены(через fileUploadMiddleware ),
        //  т.к не удалось сохранить объект(ad) в бд, необходимо удалить уже загруженные файлы
        //  объекта из хранилища
        const newImages: string[] = getImageNamesFromRequest(req)
        deleteFiles(newImages, (err) => {
            if (err) {
                return res.status(400).json({ message: 'Произошла ошибка при удалении файла' })
            }
        })
        res.status(400).json({ message: error.message })
    }
}

export const remove = async (req: any, res: Response) => {
    try {
        const ad: IAd = await AdModel.findById(req.params.id)
        if (!ad) throw Error('Объявление не найдено в базе')
        deleteFiles(ad.images, (err) => {
            if (err) {
                throw Error('Произошла ошибка при удалении файлов')
            }
        })
        await AdModel.findByIdAndDelete(ad._id)
        res.status(200).json({ message: 'Ad deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const publishOrIgnore = async (req: any, res: Response) => {//Опубликовать или игнорировать объявление
    const id: string = req.params.id
    const published: boolean = req.body.published
    const rejectionMsg: string | undefined = req.body.rejectionMsg
    const options = { new: true }
    interface IUpdate {
        published?: boolean | undefined,
        rejectionMsg?: string | undefined
    }

    const update: IUpdate = {}
    if (published === true) {
        update.published = true
        update.rejectionMsg = ''
    }
    if (published === false) {
        update.published = false
        update.rejectionMsg = rejectionMsg
    }
    const updatedAd = await AdModel.findByIdAndUpdate(id, { $set: update }, options)
    res.status(200).json({ ad: updatedAd })
}