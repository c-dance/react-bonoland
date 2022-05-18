import { useState } from 'react';
import { PannelBox, PannelWrap, PannelBtn } from './PannelStyle';

const Pannel = ({ type, position, fold, children }) => {
    // UI FUNCTION
    const [ active, setActive ] = useState(true);
    const togglePannel = () => {
        setActive(!active); 
    };

    console.log(fold);

    return (
        <PannelBox 
            type={ type } 
            position={ position }
            active={ active }
        >
            <PannelWrap>
                { children }
            </PannelWrap>
            { fold && <PannelBtn onClick={ () => togglePannel() } active={ active }></PannelBtn> }
        </PannelBox>
    )
}

export default Pannel;