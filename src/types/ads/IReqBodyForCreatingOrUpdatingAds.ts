interface IReqBodyForCreatingOrUpdatingAds {
    oldImages:string,
    deletedImages:string,
    region: string,
    refPoint: string,
    numberOfRooms: string,
    floor: string,
    numberOfStoreys: string,
    cost: string,
    currency: string
    rooms: string,
    lavatory: string
    forStudents: string,
    registration: string,
    conditioner: string,
    washMachine: string,
    internet: string,
    furniture: string,
    tv: string,
    microwaveOven: string
    additionalInfo: string,
    published: boolean,
    rejectionMsg: string,
}

export default IReqBodyForCreatingOrUpdatingAds