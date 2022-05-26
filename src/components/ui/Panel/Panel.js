import { useState } from 'react';
import { PanelBox, PanelWrap, PanelBtn } from './PanelStyle';
import { isMobile } from 'react-device-detect';

const Panel = ({ type, position, fold, children }) => {
    // UI FUNCTION
    const [ active, setActive ] = useState(true);
    const togglePanel = () => {
        setActive(!active); 
    };

    return (
        <PanelBox 
            type={ type } 
            position={ position }
            active={ active }
            className={ isMobile && "mobile" }
        >
            <PanelWrap>
                { children }
            </PanelWrap>
            { fold && <PanelBtn onClick={ () => togglePanel() } active={ active }></PanelBtn> }
        </PanelBox>
    )
}

export default Panel;