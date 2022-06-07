import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deactivateLogin } from '../../store/actions/mode';
import { BrowserView, MobileView } from 'react-device-detect';
import Modal from "../../components/Modal/Modal";
import Login from '../../components/Account/Login/Login';
import { module } from '../../themes/module';
import { USER } from '../../utils/user';


const LoginContainer = () => {

    const dispatch = useDispatch();

    const [ id, setId ] = useState('');
    const [ storeId, setStoreId ] = useState(false);
    const [ pwd, setPwd ] = useState('');

    const onIdChange = (event) => {
        setId(event.currentTarget.value);
    };

    const onPwdChange = (event) => {
        setPwd(event.currentTarget.value);
    };

    const onStoreIdChange = (event) => {
        event.preventDefault();
        const checked = !storeId;
        if(checked) USER.storeId();
        else USER.removeId(id);
        setStoreId(checked);
    };

    const checkStoredId = () => {
        const id = USER.getStoredId();
        console.log(id);
        console.log("id");
        if(id.length > 0) {
            setId(id);
            setStoreId(true);
        }
    };

    const closeLogin = () => {
        setId('');
        setPwd('');
        dispatch(deactivateLogin());
    };

    const onModeChange = (callback) => {
        setId('');
        setPwd('');
        dispatch(deactivateLogin());
        dispatch(callback());
    };

    const onFormSubmit = () => {
        
    };


    const modalProps = {
        open: true,
        close: true,
        onCloseClick: closeLogin,
        title: "로그인"
    };

    useEffect(() => {
        checkStoredId();
    }, []);
    
    return (
        <>
            <BrowserView>
                <Modal {...modalProps} >
                    <Login
                        id={ id }
                        pwd={ pwd }
                        storeId={ storeId }
                        onIdChange={ onIdChange }
                        onPwdChange={ onPwdChange }
                        onStoreIdChange={ onStoreIdChange }
                        onModeChange={ onModeChange }
                        onFormSubmit={ onFormSubmit }
                    />
                </Modal>
            </BrowserView>
        </>
    )
};

export default LoginContainer;