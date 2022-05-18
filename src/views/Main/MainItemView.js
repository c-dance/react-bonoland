import CenterItemContainer from "../../containers/Center/CenterItemContainer";
import Pannel from "../../components/Pannel/Pannel";

const MainItemView = () => {
    return (
        <Pannel
            type={ "side" }
            position={ "left" }
            fold={ true }
        >
            <CenterItemContainer />
        </Pannel>
    )
}

export default MainItemView;
