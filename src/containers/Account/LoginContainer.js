import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deactivateLogin } from '../../store/actions/mode';
import { BrowserView, MobileView } from 'react-device-detect';
import Modal from "../../components/Modal/Modal";
import Login from '../../components/Account/Login/Login';
import { module } from '../../themes/module';


const LoginContainer = () => {

    const dispatch = useDispatch();

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
        const checked = event.currentTarget.checked;
        setSaveId(checked);
    };
    
    const resetLogin = () => {
        setId('');
        setPwd('');
        setSaveId('');
    };

    const closeLogin = () => {
        dispatch(deactivateLogin());
        resetLogin();
    };

    const onModeChange = (callback) => {
        console.log(callback);
        dispatch(deactivateLogin());
        resetLogin();
        dispatch(callback());
    };


    const modalProps = {
        open: true,
        close: true,
        onCloseClick: closeLogin,
        title: "로그인"
    };
    
    return (
        <>
            <BrowserView>
                <Modal {...modalProps} >
                    <Login
                        id={ id }
                        pwd={ pwd }
                        saveId={ saveId }
                        onIdChange={ onIdChange }
                        onPwdChange={ onPwdChange }
                        onSaveIdChange={ onSaveIdChange }
                        onModeChange={ onModeChange }
                    />
                </Modal>
            </BrowserView>
        </>
    )
};

export default LoginContainer;