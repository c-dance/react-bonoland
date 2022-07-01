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
            return {...state, news: action.payload};
        case PAGES.MYPAGE_MENU: 
            return {...state, myMenu: action.payload};
        case PAGES.MYPAGE_RECENT: 
            return {...state, myRecent: action.payload};
        case PAGES.MYPAGE_INFO: 
            return {...state, myInfo: action.payload};
        case PAGES.MYPAGE_ALARM: 
            return {...state, myAlarm: action.payload};
        case PAGES.MYPAGE_ALARM_FORM: 
            return {...state, myAlarmForm: action.payload};
        case PAGES.MYPAGE_RECENT: 
            return {...state, myRecent: action.payload};
        case PAGES.MYPAGE_SCRAP: 
            return {...state, myScrap: action.payload};
        default: 
            return {...state};
    }
};

export default PageReducer;