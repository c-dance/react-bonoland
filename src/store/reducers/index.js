import { combineReducers } from "redux";
import MapReducer from "./map";
import ModeReducer from "./mode";
import AuthReducer from './auth';
import ChartReducer from "./chart";
import AlertReducer from "./alert";

const combinedReducer = combineReducers({
     Map: MapReducer,
     Mode: ModeReducer,
     Auth: AuthReducer,
     Chart: ChartReducer,
     Alert: AlertReducer
});

export default combinedReducer;