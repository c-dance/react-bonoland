export const LOCAL_STORAGE = {
    store : (namve, value) => {
        window.localStorage.setItem(name, JSON.stringify(value));
    },
    remvoe: (name) => {
        window.localStorage.removeItem(name);
    },
    get: (name) => {
        const value = window.localStorage.getItem(name);
        if(value) {return JSON.parse(value);}
        else return [0, 100];
    }
}

