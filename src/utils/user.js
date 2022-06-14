export const USER_AUTH = {
    ACCESS_TOKEN_KEY: 'accessToken',
    REFRESH_TOKEN_KEY: 'refreshToken',
    store: tokens => {
        window.localStorage.setItem(USER_AUTH.ACCESS_TOKEN_KEY, tokens.accessToken);
        window.localStorage.setItem(USER_AUTH.REFRESH_TOKEN_KEY, tokens.refreshToken);
    }, 
    get: () => {
        const auth = {
            accessToken: auth.push(window.localStorage.getItem(USER_AUTH.ACCESS_TOKEN_KEY) || null),
            refreshToken: auth.push(window.localStorage.getItem(USER_AUTH.REFRESH_TOKEN_KEY) || null)
        }
        return auth;
    }, 
    remove: () => {
        window.localStorage.removeItem(USER_AUTH.ACCESS_TOKEN_KEY);
        window.localStorage.removeItem(USER_AUTH.REFRESH_TOKEN_KEY);
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
