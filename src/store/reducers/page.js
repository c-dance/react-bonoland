import { PAGES } from '../actions/page';

const initialState = {
    center: null,
    news: false,
    myMenu: false,
    myInfo: false,
    myAlarm: false,
    myAlarmForm: false,
    myRecent: false,
    myScrap: false
}

const PageReducer = (state = initialState, action) => {
    switch(action.type) {
        case PAGES.CENTER: 
            return {...state, center: action.payload? action.payload : null};
        case PAGES.NEWS: 
            return {...initialState, news: action.payload};
        case PAGES.MYPAGE_MENU: 
            return {...state, myMenu: action.payload, news: false};
        case PAGES.MYPAGE_RECENT: 
            return {...state, myRecent: action.payload, news: false};
        case PAGES.MYPAGE_INFO: 
            return {...state, myInfo: action.payload, news: false};
        case PAGES.MYPAGE_ALARM: 
            return {...state, myAlarm: action.payload, news: false};
        case PAGES.MYPAGE_ALARM_FORM: 
            return {...state, myAlarmForm: action.payload, news: false};
        case PAGES.MYPAGE_RECENT: 
            return {...state, myRecent: action.payload, news: false};
        case PAGES.MYPAGE_SCRAP: 
            return {...state, myScrap: action.payload, news: false};
        default: 
            return {...state};
    }
};

export default PageReducer;