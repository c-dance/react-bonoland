import { FILTER } from '../actions/filter';

const initialState = {
 
    latlng: [],
    zoom: 14,
    category: null
};

const FilterReducer = (state = initialState, action) => {
    switch(action.type) {
        case FILTER.CATEGORY: 
            return {...state, category: action.payload};
        case FILTER.ALL: 
            return Object.assign({}, state, action.payload);
        default: 
            return state;
    }
};  

export default FilterReducer;