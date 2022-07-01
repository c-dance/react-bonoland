import { combineReducers } from "redux";
import UserReducer from "./user";
import AuthReducer from "./auth";
import MapReducer from "./map";
import ServiceReducer from "./service";
import ChartReducer from "./chart";
import AlertReducer from "./alert";
import GeolocationReducer from "./geolocation";
import FilterReducer from "./filter";
import PageReducer from "./page";

const combinedReducer = combineReducers({
     User: UserReducer,
     Auth: AuthReducer,
     Map: MapReducer,
     Service: ServiceReducer,
     Chart: ChartReducer,
     Alert: AlertReducer,
     Geolocation: GeolocationReducer,
     Filter: FilterReducer, 
     Page: PageReducer
});

export default combinedReducer;