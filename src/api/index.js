import axios from "axios";

const BASE_URL = 'https://bonoland.co.kr';

const api = axios.create({
    baseURL: BASE_URL
});

const executingRequests = {};

api.interceptors.request.use(function(config){
    config.headers["Content-type"] ="application/json";
    config.headers["cache-control"] = "no-cache";

    return config;
}, function(req) {
    const currentRequest = req;

    if(executingRequests[currentRequest.url]) {
        const source = executingRequests[currentRequest.url];
        delete executingRequests[currentRequest.url];
        source.cancel();
    }

    const source = axios.CancelToken.source();
    currentRequest.CancelToken = source.token;
    executingRequests[currentRequest.url] = source;
    
    return currentRequest;
});

api.interceptors.response.use(function(response){
    if(executingRequests[response.request.responseURL]) {
        delete executingRequests[response.request.responseURL];
    }

    return response;
}, function(error){ 
    const { config } = error;
    const originalRequest = config;

    if(axios.isCancel(error)) {
        return new Promise(() => {});
    }

    if(executingRequests[originalRequest.url]) {
        delete executingRequests[originalRequest.url];
    }

    consoleErr(error);
    return Promise.reject(error);
});

export const consoleErr = (err) => {
    if(err.response) {
        console.log(`status: ${err.response.status} | headers: ${err.response.headers} | data: ${err.response.data}`);
    } else {
        console.log(`ERROR: ${ err.message }`)
    }
};


export default api;
