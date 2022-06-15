import React from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../../../components/Modal/Modal';
import { useNavigate } from 'react-router';
import { activateLogin } from '../../../store/actions/mode';

const LoginRequired = () => {

    const navigate = useNavigate();

    return (
        <Modal
            width="360"
            close={ true }
            title="보노랜드 회원 서비스"
            onCloseClick={ () => navigate('/') }
        >

        </Modal>
    )
};

export default LoginRequired;