import CenterItemContainer from "../../containers/Center/CenterItemContainer";
import Pannel from "../../components/Pannel/Pannel";

const SalesItemView = () => {
    <Pannel
        type={ "side" }
        position={ "left" }
        fold={ true }
    >
        <CenterItemContainer />
    </Pannel>
};

export default SalesItemView;