import { useState } from 'react';
import { TabNavs, TabConts } from './ListTabStyle';
import CenterList from '../../Center/CenterList/CenterList';
import { logRoles } from '@testing-library/react';

const ListTab = ({ navs, contents, tabClick, activeIdx }) => {


    const toggleTab = () => {
        console.log('click');
    }

    console.log(navs, contents, tabClick, activeIdx);

    const tabNavs = navs.map((nav, idx) => (
        <div
            className={ idx === activeIdx? 'tabNav on' : 'tabNav' } 
            onClick={ () => tabClick(idx) }
        >{ nav }</div>
    ));

    const tabConts = contents.map((content, idx) => (
        <div 
            className={ idx === activeIdx? 'tabCont on' : 'tabCont' } 
        >{ content }</div>
    ))

    return (
        <div>
            <TabNavs>
                { tabNavs }
            </TabNavs>
            <TabConts>
                { tabConts }
            </TabConts>
        </div>
    )
}

export default ListTab;