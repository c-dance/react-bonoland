import React, { useState } from 'react';
import { PanelBox, PanelWrap, PanelBtn } from './PanelStyle';

/* === paner type: foating == */
/* === paner position: right, bottom == */

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
        >
            <PanelWrap>
                { children }
            </PanelWrap>
            { 
                fold && 
                <PanelBtn 
                    onClick={ () => togglePanel() } 
                    active={ active }
                    position={ position }
                ></PanelBtn> 
            }
        </PanelBox>
    )
}

export default Panel;