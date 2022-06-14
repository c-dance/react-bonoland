export const USER_AUTH = {
    USER_KEY:'bonoUser',
    store: user => {
        window.localStorage.setItem(USER_AUTH.USER_KEY, JSON.stringify(user));
    }, 
    get: () => {
        const auth = window.localStorage.getItem(USER_AUTH.USER_KEY) || null;
        return auth;
    }, 
    remove: () => {
        window.localStorage.removeItem(USER_AUTH.USER_KEY);
    }
}

export const USER_ID = {
    ID_KEY: "bonouserId",
    storeId: value => {
        window.localStorage.setItem(USER_ID.ID_KEY, JSON.stringify(value));
    },
    getStoredId: () => {
        const value = window.localStorage.getItem(USER_ID.ID_KEY);
        if(value) return value.replaceAll('"', '');
        else return "";
    },
    removeId: () => {
        window.localStorage.removeItem(USER_ID.ID_KEY);
    }
};

export const GEOLOCATION = {
    get: () => {
        if("geolocation" in navigator) {
            return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
        } else {
            return false;
        }
    }
}
