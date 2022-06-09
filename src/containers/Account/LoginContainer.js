import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deactivateLogin } from '../../store/actions/mode';
import { isBrowser, isMobile } from 'react-device-detect';
import Modal from "../../components/Modal/Modal";
import Login from '../../components/Account/Login/Login';
import { USER_ID } from '../../utils/user';
import Section from "../../components/ui/Section/Section";


const LoginContainer = () => {

    const dispatch = useDispatch();

    const ID = USER_ID.getStoredId();
    const STORE_ID = ID.length > 0;

    const handleStoredId = (checked, userId) => {
        if(checked) USER_ID.storeId(userId);
        else USER_ID.removeId();
    };
    
    const onFormSubmit = data => {
        console.log(data);
        handleStoredId(data.userStoreId, data.userId);
    };

    const modalProps = {
        open: true,
        close: true,
        width: 390,
        onCloseClick: () => {dispatch(deactivateLogin())},
        title: "로그인"
    };

    return (
        <>
        {
            isBrowser &&
                <Modal {...modalProps} >
                    <Login
                        id={ ID }
                        storeId={ STORE_ID }
                        onFormSubmit={ onFormSubmit }
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
                    onFormSubmit={ onFormSubmit }
                />
            </Section>
        }
        </>
    )
};

export default LoginContainer;