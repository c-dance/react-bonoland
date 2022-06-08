import axios from "axios";

// const BASE_URL = 'http://localhost:3500';
const BASE_URL = '../../';

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