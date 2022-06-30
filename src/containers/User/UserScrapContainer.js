import CenterList from '../../components/Center/CenterList/CenterList';
import Section from "../../components/ui/Section/Section";
import { isBrowser, isMobile } from 'react-device-detect';
import ListTab from '../../components/List/ListTab/ListTab';
import React, { useState, useEffect } from "react";
import { useGet } from '../../hooks';
import { getUserScrapCenters, getUserScrapSales } from '../../api/user';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';



const UserScrapContainer = () => {

    const category = useParams().category || 'bono';

    const USER_NO = useSelector(state => state.User.userInfo.no);
    
    const [ scraps, setScraps ] = useState('');
    const [ total, setTotal ] = useState('');
    const [ loading, error, result, setGet ] = useGet(null);

    const changeCategory = () => {

    };

    useEffect(() => {
        if(category === 'bono') setGet(getUserScrapSales(USER_NO));
        if(category === 'sisul') setGet(getUserScrapCenters(USER_NO));
    }, [category]);

    useEffect(() => {
        if(result) {
            console.log(result);
        }
    }, [result]);



    return (
        
        <Section
            title={ `찜 매물(${ total })` }
            themeColor={ isBrowser? "primary" : "secondary" }
            close={ isBrowser && true }
            back={ isMobile && true }
            action={ false }
        >
            <ListTab 
                type={ "full" }
                navs={["매물", "시설"]} 
                onNavClick={ changeCategory }
                contents={[
                    <CenterList 
                        type={ "sub" } 
                        centers={ scraps } 
                        loading={ loading }
                        error={ error }  
                    />,
                ]}
            />
        </Section>
    )
}

export default UserScrapContainer;