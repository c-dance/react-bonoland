import React, { useState } from 'react';
import SidePannel from "../../components/Sidepannel/Sidepannel";

const SidePannelContaier = ({ type, children }) => {

    const [ active, setActive ] = useState(true);
    
    const toggleActive = (event) => {
        event.preventDefault();
        setActive(!active);
    };

    return (
        <SidePannel 
            type = { type } 
            active = { active } 
            clickHandler = { toggleActive }
        >
            { children }
        </SidePannel>
    )
}

export default SidePannelContaier;