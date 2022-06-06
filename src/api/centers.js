import api from ".";

export const getFilteredCenters = async (filter=null) => {
    try {
        const response = await api.get('/centers');
        return response;
    } catch (err) {
        if(err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else {
            console.log(`ERROR: ${ err.message }`)
        }
    } 
};

export const getRecommendCenters = async (region=null) => {
    try {
        const response = await api.get('/recommends');
        return response;
    } catch (err) {
        if(err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else {
            console.log(`ERROR: ${ err.message }`)
        }
    } 
};

export const getSalesCenters = async (region=null) => {
    try {
        const response = await api.get('/sales');
        return response;
    } catch (err) {
        if(err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else {
            console.log(`ERROR: ${ err.message }`)
        }
    } 
};

