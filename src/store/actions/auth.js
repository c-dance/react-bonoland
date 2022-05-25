import axios from 'axios';
export const AUTH_USER =  'AUTH_USER';

export const signup = formDatas => dispatch => {
    axios.post('/data/signup.json', formDatas);
};
