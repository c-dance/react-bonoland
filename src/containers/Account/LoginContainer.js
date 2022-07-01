import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deactivateLogin } from '../../store/actions/service';
import { isBrowser, isMobile } from 'react-device-detect';
import Modal from "../../components/Modal/Modal";
import Login from '../../components/Account/Login/Login';
import { USER_ID } from '../../utils/user';
import Section from "../../components/ui/Section/Section";
import { login } from '../../store/actions/user'; 

const LoginContainer = () => {

    const dispatch = useDispatch();

    const USER_LOGGEDIN = useSelector(state => state.User.loggedIn);

    const ID = USER_ID.get();
    const STORE_ID = ID.length > 0;
    const [ failMsg, setFailMsg ] = useState('');

    const handleStoredId = (checked = false, userId = "") => {
        if(checked) USER_ID.store(userId);
        else USER_ID.remove();
    };
    
    const onFormSubmit = async data => {
        handleStoredId(data.userStoreId, data.userId);
        setFailMsg("");

        const RESULT = await dispatch(login({ 
            id: data.userId,
            password: data.userPwd
        }));

        if(!RESULT.success) setFailMsg(RESULT.message.toString());
    };

    const modalProps = {
        open: true,
        close: true,
        width: 390,
        center: true,
        onCloseClick: () => {dispatch(deactivateLogin())},
        title: "로그인"
    };

    useEffect(() => {
        if(USER_LOGGEDIN) dispatch(deactivateLogin());
    }, [USER_LOGGEDIN])

    return (
        <>
        {
            isBrowser &&
                <Modal {...modalProps} >
                    <Login
                        id={ ID }
                        storeId={ STORE_ID }
                        onStoreIdChange={ handleStoredId }
                        onFormSubmit={ onFormSubmit }
                        message = { failMsg }
                    />
                </Modal>
        }
        {
            isMobile && 
            <Section
                title="로그인"
                themeColor="primary"
                close={ false }
                back={ true }
                action={ false }
                onBackClick={ () => {dispatch(deactivateLogin())} }
            >
                <Login
                    id={ ID }
                    storeId={ STORE_ID }
                    onStoreIdChange={ handleStoredId }
                    onFormSubmit={ onFormSubmit }
                    message = { failMsg }
                />
            </Section>
        }
        </>
    )
};

export default LoginContainer;