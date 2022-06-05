import React, { useState } from 'react';
import Panel from "../../components/ui/Panel/Panel";

const PanelContaier = ({ type, children }) => {

    const [ active, setActive ] = useState(true);
    
    const toggleActive = (event) => {
        event.preventDefault();
        setActive(!active);
    };

    return (
        <Panel 
            type = { type } 
            active = { active } 
            clickHandler = { toggleActive }
        >
            { children }
        </Panel>
    )
}

export default PanelContaier;