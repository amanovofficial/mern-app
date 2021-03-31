import { SET_QUERY, QUERY_USED, CLEAR_QUERY } from "../actions/actionTypes";
const initialState = {
    query: null,
    changed: false
}

const filter = (state = initialState, action) => {
    switch (action.type) {
        case SET_QUERY:
            return {
                query: action.payload,
                changed: true
            }
        case QUERY_USED:
            return {
                ...state,
                changed: false
            }
        case CLEAR_QUERY:
            return {
                query: null,
                changed: false
            }
        default:
            return state
    }
}

export default filter