export const USER = {
    lckey: "bonouserId",
    storeId: value => {
        window.localStorage.setItem(USER.lckey, JSON.stringify(value));
    },
    getStoredId: () => {
        const value = window.localStorage.getItem(USER.lckey);
        if(value) return value.replaceAll('"', '');
        else return "";
    },
    removeId: () => {
        window.localStorage.removeItem(USER.lckey);
    }
}