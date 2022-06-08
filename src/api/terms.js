import api, { consoleErr } from ".";
import axios from "axios";

export const getAllTerms = async () => {
    console.log('모든 약관');

    const source = axios.CancelToken.source();
    // const url = '/terms';
    const url = 'data02/terms.json';

    try {
        const response = await api.get(url , { cancelToken: source.token });
        return response;
    } catch (err) {
        consoleErr(err);
    } finally {
        source.cancel();
    }
};

export const getPrivacyTerm = async () => {
    console.log('개인정보 처리방침');

    const source = axios.CancelToken.source();
    // const url = '/terms';
    const url = 'data02/privacypolicy.json';

    try {
        const response = await api.get(url , { cancelToken: source.token });
        return response;
    } catch (err) {
        consoleErr(err);
    } finally {
        source.cancel();
    }
};