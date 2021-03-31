import { SUCCESS, ERROR, CLEAR_ALERT } from "../actions/actionTypes";
const initialState = {
    text: '',
    variant: ''
}

const alerts = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS:
            return {
                text: action.alertText,
                variant: 'success'
            }
        case ERROR:
            return {
                text: action.alertText,
                variant: 'danger'
            }
        case CLEAR_ALERT:
            return {
                text: '',
                variant: ''
            }
        default:
            return state
    }
}

export default alerts