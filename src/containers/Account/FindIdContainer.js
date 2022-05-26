import { useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
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

    const [ modalProps, setModalProps ] = useState(modalBaseProps);
    const [ auth, setAuth ] = useState(null);

    const changeModalProps = (prop) => {
        setModalProps(Object.assign({}, modalBaseProps, prop));
    };

    const handleAuth = result => {
        if(!result) changeModalProps(FIND_ID.FAIL);
        else changeModalProps(FIND_ID.SUCCESS);
        setAuth(result);
    };

    useState(() => {
        changeModalProps(FIND_ID.FORM);
    }, [])
    
    return (
        <>
            <BrowserView>
                <Modal {...modalProps}>
                    {
                        auth === null && 
                        <AuthenticationContainer
                            handleAuth = { handleAuth }
                        />
                    }
                    {
                        auth === true &&
                        <FindIdSuccess data={"idenit@naver.com"} />
                    }
                    <module.ModalAction>
                        <button className="link">비밀번호 찾기</button>
                    </module.ModalAction>
                </Modal>
            </BrowserView>
        </>
    )
};

export default FindIdContainer;