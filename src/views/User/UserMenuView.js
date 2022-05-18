import Pannel from "../../components/Pannel/Pannel";
import MainListContainer from '../../containers/Main/MainListContainer';
import UserMenuContainer from "../../containers/User/UserMenuContainer";

const UserMenuView = () => (
    <>
        <Pannel
            type={ "floating" }
            position={ "left" }
            fold={ true }
        >
            <MainListContainer />
        </Pannel>
        <Pannel
            type={ "side" }
            position={ "right" }
            fold={ false }
        >
            <UserMenuContainer />
        </Pannel>
    </>
);

export default UserMenuView;