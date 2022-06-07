import React, { useState, useEffect } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useSelector, useDispatch } from 'react-redux';
import { activateFindPwd } from '../../store/actions/mode';
import Modal from "../../components/Modal/Modal";
import AuthenticationContainer from '../Authentifiction/AuthentificationContainer';
import { module } from '../../themes/module';
import { FIND_ID } from '../../sheme/modal';
import FindIdSuccess from '../../components/Account/FindIdSuccess/FindIdSuccess';

const FindIdContainer = () => {

    const modalBaseProps = {
        open: true,
        width: "360",
        close: true,
    };

    const dispatch = useDispatch();

    const authentificated = useSelector(state => state.Auth.authentificated);
    const [ modalProps, setModalProps ] = useState(modalBaseProps);
    const [ authResult, setAuthResult ] = useState(true);

    const initModalProps = (prop) => {
        setModalProps(Object.assign({}, modalBaseProps, prop));
    };

    const onResultSubmit = result => {
        console.log(result);
        // if(!result) initModalProps(FIND_ID.FAIL);
        // else initModalProps(FIND_ID.SUCCESS);
        setAuthResult(result);
    };


    useEffect(() => {
        initModalProps(FIND_ID.FORM);
    }, []);

    // useEffect(() => {

    // }, [authentificated]);
    
    return (
        <>
            <BrowserView>
                <Modal {...modalProps}>
                    {
                        !authResult && 
                        <AuthenticationContainer
                            onResultSubmit={ onResultSubmit }
                        />
                    }
                    {
                        authResult &&
                        <FindIdSuccess data={"idenit@naver.com"} />
                    }
                    <module.ModalAction>
                        <button className="link" onClick={() => dispatch(activateFindPwd())}>비밀번호 찾기</button>
                    </module.ModalAction>
                </Modal>
            </BrowserView>
        </>
    )
};

export default FindIdContainer;