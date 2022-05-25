import { combineReducers } from "redux";
import MapReducer from "./map";
import ModeReducer from "./mode";
import AuthReducer from './auth';

const combinedReducer = combineReducers({
     Map: MapReducer,
     Mode: ModeReducer,
     Auth: AuthReducer
});

export default combinedReducer;