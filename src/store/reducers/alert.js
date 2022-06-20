import { ALERT } from '../actions/alert';

const initialState = {
    active: false,
    message: {
        title: '',
        contents: ''
    }
};

export const AlertReducer = (state=initialState, action) => {
    switch(action.type) {
        case ALERT.ACTIVATE: 
            let message = action.payload;
            if(!('title' in message) || message.title.length <= 1) message.title = "알림";
            if(!('contents' in message) || message.contents.length <= 1) message.contents = "필수 입력값을 정확히 입력해 주세요.";
            return {...state, active: true, message: message };
        case ALERT.DEACTIVATE: 
            return initialState;
        default: 
            return state;
    }
};

export default AlertReducer;