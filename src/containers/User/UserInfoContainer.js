import { useState } from 'react';
import { useFetch } from '../../hooks';
import Section from "../../components/ui/Section/Section";
import UserAuthForm from '../../components/User/UserAuthForm/UserAuthForm';


const UserInfoContainer = () => {

    const [ auth, setAuth ] = useState(false);
    const [ page, userInfo ] = useFetch({}, '');
    const [ form, setForm ] = useState({});

    return (
        <>
            {
                !auth && 
                <Section
                    title={"회원 정보 변경"}
                    close={ true }
                    themeColor={ "primary" }
                >
                    <UserAuthForm />
                </Section>
            }
            {
                auth && 
                <Section
                    title={"회원 정보 변경"}
                    close={ true }
                    themeColor={ "primary" }
                >
    
                </Section>
            }
        </>
    )
};

export default UserInfoContainer;