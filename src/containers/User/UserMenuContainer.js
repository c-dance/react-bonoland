import Section from "../../components/ui/Section/Section";
import UserMenu from "../../components/User/UserMenu/UserMenu";
import { useNavigate } from "react-router";
import { isBrowser, isMobile } from "react-device-detect";
import React from "react";

const UserMenuContainer = () => {

    const navigate = useNavigate();
    const onCloseClick = () => { navigate('/'); };

    return (
        <Section
            title={ "마이페이지" }
            themeColor="primary"
            close={ isBrowser && true }
            back={ isMobile && true }
        >
            <UserMenu />
        </Section>
    )
};

export default UserMenuContainer;