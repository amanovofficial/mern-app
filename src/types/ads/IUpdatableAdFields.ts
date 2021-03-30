interface IUpdatableAdFields{
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
    published?:boolean,
    rejectionMsg?:string,
    userID?:string,
}

export default IUpdatableAdFields