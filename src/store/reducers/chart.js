import { CHART } from "../actions/chart";

const initialState = {
    activate: false,
    hasData: false,
    data: {}
};

const ChartReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHART.ACTIVATE:
            return {...state, activate: true};
        case CHART.DEACTIVATE: 
            return {...state, activate: false};
        case CHART.UPDATE: 
            const data = action.payload;
            const hasData = Object.keys(data).length > 0 || false;
            return {...state, data: data, hasData: hasData};
        default : 
            return state;
    }
};

export default ChartReducer;