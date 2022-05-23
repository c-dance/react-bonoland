import CenterItemContainer from "../../containers/Center/CenterItemContainer";
import Panel from "../../components/ui/Panel/Panel";

const CenterItemView = () => {
    return (
        <Panel
            type={ "side" }
            position={ "left" }
            fold={ true }
        >
            <CenterItemContainer />
        </Panel>
    )
}

export default CenterItemView;
