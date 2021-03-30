import { Schema, model, Document, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
export interface IUser extends Document {
    _id?: Types.ObjectId,
    role: string,
    name: string,
    password: string,
    phoneNumber: string,
    isBlocked?:boolean
}

const UserSchema: Schema = new Schema({
    role: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },

})

UserSchema.plugin(mongoosePaginate)
export const UserModel = model("User", UserSchema);
