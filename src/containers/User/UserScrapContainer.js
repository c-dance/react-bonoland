import CenterList from '../../components/Center/CenterList/CenterList';
import Section from "../../components/ui/Section/Section";
import { isBrowser, isEdgeChromium, isMobile } from 'react-device-detect';
import ListTab from '../../components/List/ListTab/ListTab';
import React, { useState, useEffect } from "react";
import { useGet } from '../../hooks';
import { getUserScrapCenters, getUserScrapSales } from '../../api/user';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deactivateMyScrap } from '../../store/actions/page';



const UserScrapContainer = () => {

    const dispatch = useDispatch();

    const USER_NO = useSelector(state => state.User.userInfo).no;
    
    const [ category, setCategory ] = useState('sales');
    const [ total, setTotal ] = useState(0);
    const [ scraps, setScraps ] = useState([]);
    const [ loading, error, result, setGet ] = useGet([]);

    const onCloseClick = () => { dispatch(deactivateMyScrap()) };

    const changeCategory = (name) => {
        setCategory(name==="매물"? 'sales' : 'sisul')
    };

    useEffect(() => {
        if(category === 'sales') setGet(getUserScrapSales(USER_NO));
        if(category === 'sisul') setGet(getUserScrapCenters(USER_NO));
    }, [category]);

    useEffect(() => {
        if(result && result.arrayResult) {
            setScraps(result.arrayResult.map(item => ({...item, zzimResult: 1})));
            setTotal(result.arrayResult[0].totalCount)
        } else {
            setScraps([]);
        }
    }, [result]);

    return (
        
        <Section
            title={ `찜 매물(${ total? total : '' })` }
            themeColor={ isBrowser? "primary" : "secondary" }
            close={ isBrowser && true }
            back={ isMobile && true }
            onCloseClick={ onCloseClick }
            onBackClick={ onCloseClick }
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
                    <CenterList 
                        type={ "sub" } 
                        centers={ scraps } 
                        loading={ loading }
                        error={ error }  
                    />
                ]}
            />
        </Section>
    )
}

export default UserScrapContainer;