import { useState } from 'react';
import { useFetch } from '../../hooks';
import Section from "../../components/ui/Section/Section";


const UserInfoContainer = () => {

    const [ auth, setAuth ] = useState(false);
    const [ page, userInfo ] = useFetch({}, '');
    const [ form, setForm ] = useState({});

    return (
        <>
            {
                !auth && <Section
                    title={"회원 정보 변경"}
                    close={ true }
                    themeColor={ "primary" }
                >
    
                </Section>
            }
            {
                auth && <Section
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