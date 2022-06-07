import api, { consoleErr } from ".";
import axios from "axios";

export const getUserRecentCenters = async id => {
    console.log('회원 최근 본 매물');

    const source = axios.CancelToken.source();
    const url = '/recentcenters';

    try {
        const response = await api.get(url , { cancelToken: source.token });
        return response;
    } catch (err) {
        consoleErr(err);
    } finally {
        source.cancel();
    }
};

export const getUserScrapCenters = async id => {
    console.log('회원 스크랩 목록');

    const source = axios.CancelToken.source();
    const url = '/scrapcenters';

    try {
        const response = await api.get(url , { cancelToken: source.token });
        return response;
    } catch (err) {
        consoleErr(err);
    } finally {
        source.cancel();
    }
};

export const getUserAlarmCenters = async id => {
    console.log('회원 알람 목록');

    const source = axios.CancelToken.source();
    const url = '/alarmcenters';

    try {
        const response = await api.get(url , { cancelToken: source.token });
        return response;
    } catch (err) {
        consoleErr(err);
    } finally {
        source.cancel();
    }
};
