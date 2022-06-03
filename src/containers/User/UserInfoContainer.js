import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFetch } from '../../hooks';
import Section from "../../components/ui/Section/Section";
import UserAuthForm from '../../components/User/UserAuthForm/UserAuthForm';
import { activateAlert } from '../../store/actions/alert'


const UserInfoContainer = () => {

    const dispatch = useDispatch();

    const [ auth, setAuth ] = useState(false);
    const [ password, setPassword ] = useState('');
    const [ page, userInfo ] = useFetch({}, '');
    const [ form, setForm ] = useState({});
    
    const onaAuthSubmit = () => {
        // if(password === '1234') setAuth(true);
        // else dispatch(ac)
    };

    return (
        <>
            {
                !auth && 
                <Section
                    title={"회원 정보 변경"}
                    close={ true }
                    themeColor={ "primary" }
                >
                    <UserAuthForm
                        password={ password }
                        onPasswordChange={ setPassword }
                        // onSubmit={ onaAuthSubmit }
                    />
                </Section>
            }
            {
                auth && 
                <Section
                    title={"회원 정보 변경"}
                    close={ true }
                    themeColor={ "primary" }
                >
                    {/* <UserInfo /> */}
                </Section>
            }
        </>
    )
};

export default UserInfoContainer;