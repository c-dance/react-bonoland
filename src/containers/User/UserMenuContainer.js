import SideSection from "../../components/SideSection/SideSection";
import UserMenu from "../../components/User/UserMenu/UserMenu";

const UserMenuContainer = () => {
    return (
        <SideSection
            title={ "메뉴" }
            themeColor={ "primary" }
            close={ true }
        >
            <UserMenu />
        </SideSection>
    )
};

export default UserMenuContainer;