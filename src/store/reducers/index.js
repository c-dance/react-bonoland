import { combineReducers } from "redux";
import MapReducer from "./map";
import ModeReducer from "./mode";
import AuthReducer from './auth';
import ChartReducer from "./chart";
import AlertReducer from "./alert";
import UserReducer from "./user";

const combinedReducer = combineReducers({
     Map: MapReducer,
     Mode: ModeReducer,
     Auth: AuthReducer,
     Chart: ChartReducer,
     Alert: AlertReducer,
     User: UserReducer,
});

export default combinedReducer;