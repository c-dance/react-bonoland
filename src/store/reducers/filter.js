import { FILTER } from '../actions/filter';

const initialState = {
    region: "",
    latlng: [],
    zoom: 14,
    category: ""
};

const FilterReducer = (state = initialState, action) => {
    switch(action.type) {
        case FILTER.REGION:
            return {...state, region: action.payload};
        case FILTER.CATEGORY: 
            return {...state, category: action.payload};
        case FILTER.ALL: 
            return Object.assign({}, state, action.payload);
        default: 
            return state;
    }
};  

export default FilterReducer;