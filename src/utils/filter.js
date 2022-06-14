import { CATEGORY, TYPE_AND_CAPACITY } from "../sheme/filter"; 

export const LOCAL_STORAGE = {
    store : (name, value) => {
        console.log(name)
        window.localStorage.setItem(CATEGORY[name]["key"], JSON.stringify(value));
    },
    remvoe: (name) => {
        window.localStorage.removeItem(CATEGORY[name]["key"]);
    },
    get: (name) => {
        const value = window.localStorage.getItem(CATEGORY[name]["key"]);
        if(value !== undefined && value !== null) { 
            return JSON.parse(value);
        } else {
            return TYPE_AND_CAPACITY[name][0].value;
        }
    }
}

