import React from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../../../components/Modal/Modal';
import { useNavigate } from 'react-router';
import { activateLogin } from '../../../store/actions/mode';
import { deactivateLoginRequired } from '../../../store/actions/mode';
import { module } from '../../../themes/module';

const LoginRequired = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <Modal
            width="360"
            close={ true }
            title="보노랜드 회원 서비스"
            description="로그인 후 이용하실 수 있습니다."
            onCloseClick={ () => { dispatch(deactivateLoginRequired()); } }
            >
            <module.SubmitButton
                onClick={() => dispatch(activateLogin()) }
            >로그인 하기</module.SubmitButton>
        </Modal>
    )
};

export default LoginRequired;