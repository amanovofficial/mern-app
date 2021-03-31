import {
    CLEAR_ALERT
} from "./actionTypes";

export function setAlert(type,alertText) {
    return {
        type ,
        alertText
    }
}

export function clearAlert(){
    return{
        type:CLEAR_ALERT
    }
}