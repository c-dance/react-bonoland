import React, { useState, useEffect } from 'react';

export const useInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    return [
        { value, onChange: e => setValue(e.currentTarget.value) },
        () => setValue(initialValue)
    ];
};

export const useGet = (initialValue) => {
    const [ api, setApi ] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [noData, setNoData] = useState(false);
    const [data, setData] = useState(initialValue);
    
    const getResponse = async api => {
        const response = await api;
        console.log(response);

        if(response) {
            const data = response.data;
            if(Array.isArray(data) && response.data.length <= 0) setNoData(true);
            else if(typeof data === 'object' && Object.keys(data).length <= 0) setNoData(true);
            else setNoData(false);

            setData(data);
            setLoading(false);
        } else {
            setError(true);
            setLoading(false);
        }
    }

    const initProps = () => {
        setLoading(true);
        setError(false);
        setNoData(false);
    }

    useEffect(() => {
        if(api !== null) {
            initProps();
            getResponse(api);
        }
    }, [api]);

    return [loading, error, noData, data, setApi];
};



export const useFetch = (initialValue, url) => {
    // loading, success, fail, empty
    const [ page, setPage ] = useState('loading');
    const [ data, setData ] = useState(initialValue);
    
    const getDataType = data => (
        Array.isArray(data)? "array" : typeof initialValue
    );
        
    const hasData = data => {
        switch(getDataType(data)) {
            case 'array' : 
                return data.length;
            case 'object' :
                return Object.keys(data).length;
            default : 
                return false;
        }
    };

    const DATA_TYPE = getDataType(initialValue);

    const fetchData = url => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if(DATA_TYPE === getDataType(data) && hasData(data)) {
                    setPage('success');
                    setData(data);
                } else if(DATA_TYPE !== getDataType(data)) {
                    setPage('fail');
                } else if(!hasData(data)) {
                    setPage('empty');
                } else {
                    setPage('fail');
                }
            })
            .catch(err => {
                setData(initialValue);
                setPage('fail');
            })
    };

    useEffect(() => {
        fetchData(url);
    }, []);

    return [ page, data ];
}