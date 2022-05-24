import { useState } from 'useState';
import SignUpType from "../../components/Account/SignUpType/SignUpType";
import SignUpForm from "../../components/Account/SignUpForm/SignUpForm";
import Alert from "../../components/ui/Alert/Alert";
import Modal from "styled-react-modal";

const SignUpContaienr = ({
    active
}) => {

    // active시에 store signup Form 리셋
    const [ active, setActive ] = useState(false);
    const [ form, setForm ] = useState({});

    // type 지정시에 auth 로 화면 전환
    const [ type, setType ] = useState(false);

    return (
        <div>signup</div>
    )
};

export default SignUpContaienr;