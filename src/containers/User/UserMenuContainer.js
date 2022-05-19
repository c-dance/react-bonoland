import Section from "../../components/ui/Section/Section";
import UserMenu from "../../components/User/UserMenu/UserMenu";

const UserMenuContainer = () => {
    return (
        <Section
            title={ "메뉴" }
            themeColor={ "primary" }
            close={ true }
        >
            <UserMenu />
        </Section>
    )
};

export default UserMenuContainer;