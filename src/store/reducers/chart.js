import { CHART } from "../actions/chart";

const initialState = {
    active: false,
    data: null
};

const ChartReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHART.ACTIVATE:
            return {...state, active: true};
        case CHART.DEACTIVATE: 
            return {...state, active: false};
        case CHART.UPDATE: 
            const data = action.payload;
            return {...state, data: data };
        default : 
            return state;
    }
};

export default ChartReducer;