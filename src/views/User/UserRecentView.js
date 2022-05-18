import Pannel from "../../components/Pannel/Pannel";
import UserRecentContainer from "../../containers/User/UserRecentContainer";

const UserRecentView = () => {
    return (
        <Pannel
            type={ "side" }
            position={ "right" } 
            fold={ false }
        >
            <UserRecentContainer />
        </Pannel>
    )
}

export default UserRecentView;