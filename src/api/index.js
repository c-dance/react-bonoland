import axios from "axios";
import { USER_AUTH } from "../utils/user";

const BASE_URL = 'http://localhost:3500';
// const BASE_URL = 'https://bonoland.co.kr';

export default axios.create({
    baseURL: BASE_URL
});

export const consoleErr = (err) => {
    if(err.response) {
        console.log(`status: ${err.response.status} | headers: ${err.response.headers} | data: ${err.response.data}`);
    } else {
        console.log(`ERROR: ${ err.message }`)
    }
};

export const authHeader = () => {
    const auth = USER_AUTH.get();
    if(auth && auth.accessToken) {
        return { 
            "Content-Type": 'application/json',
            "x-access-token" : auth.accessToken 
        }
    } else {
        return { "Content-Type": 'application/json' };
    }
};
