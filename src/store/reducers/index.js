import { combineReducers } from "redux";
import UserReducer from "./user";
import AuthReducer from "./auth";
import MapReducer from "./map";
import ModeReducer from "./mode";
import ChartReducer from "./chart";
import AlertReducer from "./alert";
import GeolocationReducer from "./geolocation";

const combinedReducer = combineReducers({
     User: UserReducer,
     Auth: AuthReducer,
     Map: MapReducer,
     Mode: ModeReducer,
     Chart: ChartReducer,
     Alert: AlertReducer,
     Geolocation: GeolocationReducer
});

export default combinedReducer;