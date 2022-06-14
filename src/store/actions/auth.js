import axios from 'axios';
import { userLogin, userLogout } from '../../api/user';

export const AUTH = {
    SUCCESS: 'auth_success'
};

export const login = data => async dispatch => {
   const response = await userLogin(data);
    if(response) {
        dispatch({
            type: SUCESS,
            payload: true
        })
    } else {
        
    }   
};

export const logout = () => dispatch => {

} 
