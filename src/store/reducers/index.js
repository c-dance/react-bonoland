import { combineReducers } from "redux";
import MapReducer from "./map";

const combinedReducer = combineReducers({
     Map: MapReducer
});

export default combinedReducer;