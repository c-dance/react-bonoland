import { Pannel, PannelWrap, PannelBtn } from './SidePannelStyle';

const SidePannel = ({ type, active, clickHandler, children }) => {
    return (
        <Pannel type={ type } active={ active }>
            <PannelWrap>
                { children }
            </PannelWrap>
            <PannelBtn onClick={ event => clickHandler(event) }></PannelBtn>
        </Pannel>
    )
}

export default SidePannel;