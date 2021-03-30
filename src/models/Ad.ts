import { Schema, model, Document, Types } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2";
export interface IAd extends Document {
    _id: Types.ObjectId,
    images: string[],
    region: string,
    refPoint: string,
    numberOfRooms: string,
    floor: string,
    numberOfStoreys: string,
    rentCost: {
        cost: string,
        currency: string
    },
    typeOfLayout: {
        rooms: string,
        lavatory: string
    },
    forStudents: string,
    registration: string,
    facilities: {
        conditioner: string,
        washMachine: string,
        internet: string,
        furniture: string,
        tv: string,
        microwaveOven: string
    },
    additionalInfo: string,
    date: Date,
    published: boolean,
    rejectionMsg: string,
    userID: Schema.Types.ObjectId
}
const adSchema = new Schema({
    images: [], //путь к директориям где хранятся фотографии квартиры
    region: { type: String, required: true }, //регион
    refPoint: { type: String }, //ориентир
    numberOfRooms: { type: String, required: true }, //количество комнат
    floor: { type: String, required: true }, //этаж квартиры
    numberOfStoreys: { type: String, required: true }, //этажность дома
    rentCost: {  //стоимость аренды
        cost: { type: String, required: true },
        currency: { type: String, required: true }//валюта
    },
    typeOfLayout: { //тип планировки:
        rooms: { type: String }, //комнат
        lavatory: { type: String } //санузла
    },
    forStudents: { type: String, default: 'нет' }, //Сдается ли квартира студентам
    registration: { type: String, default: 'нет' }, //оформляется ли временная прописка
    facilities: {  //удобства
        conditioner: { type: String, default: 'нет' },//кондиционер
        washMachine: { type: String, default: 'нет' },//стиральная машина
        internet: { type: String, default: 'нет' }, // интернет
        furniture: { type: String, default: 'нет' }, //мебель
        tv: { type: String, default: 'нет' }, // телевизор
        microwaveOven: { type: String, default: 'нет' }, //микроволновка
    },
    additionalInfo: { type: String }, //дополнительная информация(доп. контакты, условия, описание)
    date: { type: Date, default: Date.now }, //дата создания объявления
    published: { type: Boolean, default: false },
    rejectionMsg: { type: String, default: 'Данное объявление еще не проверено модераторами и не видно другим пользователям' },
    userID: { type: Schema.Types.ObjectId, required: true } //id пользователя
})
adSchema.plugin(mongoosePaginate)

export default model('Ads', adSchema)