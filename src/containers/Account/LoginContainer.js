import { useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import Modal from "../../components/Modal/Modal";
import { module } from '../../themes/module';
import { LOGIN } from '../../sheme/modal';
import Login from '../../components/Account/Login/Login';

const LoginContainer = ({ active }) => {

    const [ id, setId ] = useState('');
    const [ pwd, setPwd ] = useState('');
    const [ saveId, setSaveId ] = useState(false);

    const onIdChange = (event) => {
        setId(event.currentTarget.value);
    };

    const onPwdChange = (event) => {
        setPwd(event.currentTarget.value);
    };

    const onSaveIdChange = (event) => {
        setSaveId(event.currentTarget.value);
    };
    

    return (
        <Login
            id={ id }
            pwd={ pwd }
            saveId={ saveId }
            onIdChange={ onIdChange }
            onPwdChange={ onPwdChange }
            onSaveIdChange={ onSaveIdChange }
        />
    )
};

export default LoginContainer;