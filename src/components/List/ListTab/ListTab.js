import React, { useState } from 'react';
import { Tab, TabNavs, TabConts } from './ListTabStyle';

const ListTab = ({ 
    navs, 
    onNavClick = () => {},
    contents, 
    type 
}) => {

    const [ activeIdx, setActiveIdx ] = useState(0);
    const toggleActive = idx => setActiveIdx(idx);

    const tabNavs = navs.map((nav, idx) => (
        <div
            className={ idx === activeIdx? 'tabNav on' : 'tabNav' } 
            onClick={ () => {
                onNavClick(nav);
                toggleActive(idx);
            } }
            key={ idx }
        >{ nav }</div>
    ));

    const tabConts = contents.map((content, idx) => (
        <div 
            className={ idx === activeIdx? 'tabCont on' : 'tabCont' } 
            key={ idx }
        >{ content }</div>
    ));

    return (
        <Tab className={ type? type : "" }>
            <TabNavs>
                { tabNavs }
            </TabNavs>
            <TabConts>
                { tabConts }
            </TabConts>
        </Tab>
    )
}

export default ListTab;