export const PAGES = {
    CENTER: '/center',
    NEWS: '/news',
    MYPAGE_MENU: '/user/menu',
    MYPAGE_INFO: '/user/info',
    MYPAGE_ALARM: '/user/alarm',
    MYPAGE_ALARM_FORM: '/user/alarm/form',
    MYPAGE_RECENT: '/user/recent',
    MYPAGE_SCRAP: '/user/scrap',
};

export const activateCenter = (centerNo) => ({ type: PAGES.CENTER, payload: centerNo });
export const deactivateCenter = () => ({ type: PAGES.CENTER });

export const activateNews = () => ({ type: PAGES.NEWS, payload: true });
export const deactivateNews = () => ({ type: PAGES.NEWS, payload: false });

export const activateMyMenu = () => ({ type: PAGES.MYPAGE_MENU, payload: true });
export const deactivateMyMenu = () => ({ type: PAGES.MYPAGE_MENU, payload: false });

export const activateMyInfo = () => ({ type: PAGES.MYPAGE_INFO, payload: true });
export const deactivateMyInfo = () => ({ type: PAGES.MYPAGE_INFO, payload: false });

export const activateMyAlarm = () => ({ type: PAGES.MYPAGE_ALARM, payload: true });
export const deactivateMyAlarm = () => ({ type: PAGES.MYPAGE_ALARM, payload: false });

export const activateMyAlarmForm = () => ({ type: PAGES.MYPAGE_ALARM_FORM, payload: true });
export const deactivateMyAlarmForm = () => ({ type: PAGES.MYPAGE_ALARM_FORM, payload: false });

export const activateMyRecent = () => ({ type: PAGES.MYPAGE_RECENT, payload: true });
export const deactivateMyRecent = () => ({ type: PAGES.MYPAGE_RECENT, payload: false });

export const activateMyScrap = () => ({ type: PAGES.MYPAGE_SCRAP, payload: true });
export const deactivateMyScrap = () => ({ type: PAGES.MYPAGE_SCRAP, payload: false });
