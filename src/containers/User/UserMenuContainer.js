import Section from "../../components/ui/Section/Section";
import UserMenu from "../../components/User/UserMenu/UserMenu";
import { useDispatch } from "react-redux";
import { isBrowser, isMobile } from "react-device-detect";
import React from "react";
import { deactivateMyMenu } from "../../store/actions/page";

const UserMenuContainer = () => {

    const dispatch = useDispatch();
    const onCloseClick = () => {
        dispatch(deactivateMyMenu())
    } 

    return (
        <Section
            title={ "마이페이지" }
            themeColor="primary"
            close={ isBrowser && true }
            back={ isMobile && true }
            onCloseClick={ onCloseClick }
            onBackClick={ onCloseClick }
        >
            <UserMenu />
        </Section>
    )
};

export default UserMenuContainer;