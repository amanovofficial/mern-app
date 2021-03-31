import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import filterReducer from "./filterReducer";
export default combineReducers(
    { 
      auth:authReducer,
      alert:alertReducer,
      filter:filterReducer
    }
)