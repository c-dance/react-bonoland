import { createStore, applyMiddleware } from 'redux';
import combinedReducer from './reducers';
import reduxThunk from 'redux-thunk';

const store = createStore(
    combinedReducer, 
    {},
    applyMiddleware(reduxThunk)
);

export default store;



