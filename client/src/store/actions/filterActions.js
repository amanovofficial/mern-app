import { SET_QUERY, CLEAR_QUERY, QUERY_USED } from "./actionTypes";

export const setQuery = (dispatch) => (query) => {
    dispatch({ type: SET_QUERY, payload: query })
}

export const queryUsed = (dispatch) => () => {
    dispatch({ type: QUERY_USED })
}

export const clearQuery = (dispatch) => () => {
    dispatch({ type: CLEAR_QUERY })
}