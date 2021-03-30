import { Result,ValidationError } from "express-validator"

export default (errors:Result<ValidationError>)=>{
    if (!errors.isEmpty()) {
        throw Error(errors.array().map(err => err.msg).join(', '))
    }
}