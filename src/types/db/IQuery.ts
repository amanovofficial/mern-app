// interface IFacilities {
//     internet?: string,
//     conditioner?: string,
//     tv?: string,
//     furniture?: string,
//     washMachine?: string,
//     microwave?: string,
// }

import { Types } from "mongoose";

interface IQuery {
    published?: boolean,
    '$or'?: any,
    forStudents?: string,
    numberOfRooms?: any,
    'facilities.internet'?: string,
    'facilities.conditioner'?: string,
    'facilities.tv'?: string,
    'facilities.furniture'?: string,
    'facilities.washMachine'?: string,
    'facilities.microwave'?: string,
    userID?:Types.ObjectId
}

export default IQuery
