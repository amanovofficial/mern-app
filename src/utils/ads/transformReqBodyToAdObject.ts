import IUpdatableAdFields from "../../types/ads/IUpdatableAdFields";
import IReqBodyForCreatingOrUpdatingAds from "../../types/ads/IReqBodyForCreatingOrUpdatingAds";
import getImageNamesFromRequest from "./getImageNamesFromRequest";
type UserID = string | null
// Данная функция имеет два варианта вызова:
// 1.С параметром userID
// 2.Без параметра userID
export default (req: any, userID: UserID = null): IUpdatableAdFields => {

    const reqBody: IReqBodyForCreatingOrUpdatingAds = req.body
    const newImages: string[] = getImageNamesFromRequest(req)
    let images: string[] = []
    let published: null | boolean = null
    // при обновлении объявлений функция вызывается без параметра userID(т.е userID=null)
    // т.к не требуется обновление id юзера, который создал данную объявлению
    if (userID === null) {
        // если фукция вызывается для обновления объявлений
        // то объединяем уже существующие фото с новыми
        images = images.concat(JSON.parse(reqBody.oldImages))
        published = false
    }
    images = images.concat(newImages)

    const updatableAdFields: IUpdatableAdFields = {
        images,
        region: reqBody.region,
        refPoint: reqBody.refPoint,
        numberOfRooms: reqBody.numberOfRooms,
        floor: reqBody.floor,
        numberOfStoreys: reqBody.numberOfStoreys,
        rentCost: {
            cost: reqBody.cost,
            currency: reqBody.currency
        },
        typeOfLayout: {
            rooms: reqBody.rooms,
            lavatory: reqBody.lavatory
        },
        forStudents: reqBody.forStudents,
        registration: reqBody.registration,
        facilities: {
            conditioner: reqBody.conditioner,
            washMachine: reqBody.washMachine,
            internet: reqBody.internet,
            furniture: reqBody.furniture,
            tv: reqBody.tv,
            microwaveOven: reqBody.microwaveOven
        },
        additionalInfo: reqBody.additionalInfo
    }
    if (userID !== null) {
        updatableAdFields.userID = userID
    }
    if (published !== null) {
        updatableAdFields.published = published
        updatableAdFields.rejectionMsg = 'После обновлении, объявлении подлежат повторной модерации'
    }
    return updatableAdFields
}