import React, { useState } from 'react';
import Pannel from "../../components/Pannel/Pannel";

const PannelContaier = ({ type, children }) => {

    const [ active, setActive ] = useState(true);
    
    const toggleActive = (event) => {
        event.preventDefault();
        setActive(!active);
    };

    return (
        <Pannel 
            type = { type } 
            active = { active } 
            clickHandler = { toggleActive }
        >
            { children }
        </Pannel>
    )
}

export default PannelContaier;