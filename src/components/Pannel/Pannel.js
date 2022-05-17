import { PannelBox, PannelWrap, PannelBtn } from './PannelStyle';

const Pannel = ({ type, active, clickHandler, children }) => {
    return (
        <PannelBox type={ type } active={ active }>
            <PannelWrap>
                { children }
            </PannelWrap>
            <PannelBtn onClick={ event => clickHandler(event) } active={ active }></PannelBtn>
        </PannelBox>
    )
}

export default Pannel;