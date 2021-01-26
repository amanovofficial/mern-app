import {Schema,model,Document} from "mongoose";

export interface IUser extends Document{
    name:string,
    password:string,
    phoneNumber:string
}

const UserSchema:Schema = new Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    }
}) 

export const UserModel = model<IUser>("User", UserSchema);
