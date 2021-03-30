import { Types } from "mongoose";
import { IAd } from "../../models/Ad";
import IQuery from "../../types/db/IQuery";
import escapeRegex from "./escapeRegex";
function transformToMongoQuery(req: any, res: any): IQuery {
    const { published, adress, forStudents } = req.query
    let { numberOfRooms, facilities } = req.query
    const { user } = res.locals
    numberOfRooms = numberOfRooms ? JSON.parse(numberOfRooms) : null
    facilities = facilities ? JSON.parse(facilities) : null
    const mongoQuery: IQuery = {
        published: true
    }

    if (adress) {
        const regex = new RegExp(escapeRegex(adress), 'gi')
        mongoQuery.$or = [
            { region: regex },
            { refPoint: regex },
            { additionalInfo: regex }
        ]
    }

    if (forStudents) {
        mongoQuery.forStudents = 'да'
    }
    if (numberOfRooms) {
        mongoQuery.numberOfRooms = { $in: numberOfRooms }
    }
    if (user !== undefined && user.role === 'user') {//если запрос идет от авторизованного пользователя
        mongoQuery.userID = Types.ObjectId(user.id) //удаляем фильтр published
        //пользователю будет видно все свои объявлении(опубликованные и неопубликованные)
        delete mongoQuery.published
    }
    // если запрос идет от админа, то можно предоставить доступ
    // к неопубликованным объявлениям
    const isAdmin = (user !== undefined && user.role === 'admin')
    const unpublished = (published === undefined || published === 'false')
    if (isAdmin && unpublished) {
        mongoQuery.published = false
    }

    if (facilities) {
        Object.keys(facilities).forEach(key => {
            switch (key) {
                case 'internet':
                    mongoQuery["facilities.internet"] = 'есть';
                    break;
                case 'conditioner':
                    mongoQuery["facilities.conditioner"] = 'есть';
                    break;
                case 'tv':
                    mongoQuery["facilities.tv"] = 'есть';
                    break;
                case 'furniture':
                    mongoQuery["facilities.furniture"] = 'есть';
                    break;
                case 'washMachine':
                    mongoQuery["facilities.washMachine"] = 'есть';
                    break;
                case 'microwave':
                    mongoQuery["facilities.microwave"] = 'есть';
                    break;
                default: null
            }
        })
    }

    return mongoQuery
}

export default transformToMongoQuery