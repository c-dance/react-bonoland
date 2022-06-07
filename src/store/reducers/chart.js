import { CHART } from "../actions/chart";

const initialState = {
    activate: false,
    data: null
};

const ChartReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHART.ACTIVATE:
            return {...state, activate: true};
        case CHART.DEACTIVATE: 
            return {...state, data: null,  activate: false};
        case CHART.UPDATE: 
            const data = action.payload;
            return {...state, data: data };
        default : 
            return state;
    }
};

export default ChartReducer;