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
