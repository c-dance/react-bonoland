import { FILTER } from '../actions/filter';

const initialState = {
    latlng: [],
    zoom: 14,
    category: null, 
    category2: null
};

const FilterReducer = (state = initialState, action) => {
    switch(action.type) {
        case FILTER.CATEGORY: 
            return {...state, category: action.payload};
        case FILTER.UPDATE: 
            return Object.assign({}, state, action.payload);
        case FILTER.RESET: 
            return initialState;
        default: 
            return state;
    }
};  

export default FilterReducer;