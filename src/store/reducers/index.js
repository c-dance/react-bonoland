import { combineReducers } from "redux";
import MapReducer from "./map";
import ModeReducer from "./mode";
import AuthReducer from './auth';
import ChartReducer from "./chart";

const combinedReducer = combineReducers({
     Map: MapReducer,
     Mode: ModeReducer,
     Auth: AuthReducer,
     Chart: ChartReducer
});

export default combinedReducer;