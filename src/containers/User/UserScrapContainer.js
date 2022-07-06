import CenterList from '../../components/Center/CenterList/CenterList';
import Section from "../../components/ui/Section/Section";
import { isBrowser, isMobile } from 'react-device-detect';
import ListTab from '../../components/List/ListTab/ListTab';
import React, { useState, useEffect } from "react";
import { useGet } from '../../hooks';
import { getUserScrapCenters, getUserScrapSales } from '../../api/user';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deactivateMyScrap } from '../../store/actions/page';

const SCRAP_CTG = {
    'mamul': {
        title: '매물',
        index: 0
    },
    'sisul': {
        title: '시설', 
        index: 1
    }
}

const UserScrapContainer = () => {

    const dispatch = useDispatch();

    const USER_NO = useSelector(state => state.User.userInfo).no;
    
    const [ category, setCategory ] = useState('mamul');
    const [ total, setTotal ] = useState(0);
    const [ sisuls, setSisuls ] = useState([]);
    const [ mamuls, setMamuls ] = useState([]);

    const [ sisulNextIndex, setSisulNextIndex ] = useState(1);
    const [ sisulHasNext, setSisulHasNext ] = useState(false);
    const [ sisulIsNextLoading, setSisulIsNextLoading ] = useState(false);

    const [ mamulNextIndex, setMamulNextIndex ] = useState(1);
    const [ mamulHasNext, setMamulHasNext ] = useState(false);
    const [ mamulIsNextLoading, setMamulIsNextLoading ] = useState(false);

    const sisulLoadInitial = async () => {
        setSisulIsNextLoading(true);
        const RESPONSE = await getUserScrapCenters({ userNo: USER_NO, page: 1 });
        console.log(RESPONSE);
        if(RESPONSE && RESPONSE.data.code === 1) { 
            setSisuls(RESPONSE.data.arrayResult);
            setSisulHasNext(RESPONSE.data.pageCode == 1);
            setTotal(RESPONSE.data.totalCount);
        }
        setSisulIsNextLoading(false);
        setSisulNextIndex(2);
    };

    const sisulLoadNext = async () => {
        setSisulIsNextLoading(true);
        const RESPONSE = await getUserScrapCenters({ userNo: USER_NO, page: 1 });
        setTimeout(function(){
            if(RESPONSE && RESPONSE.data.code === 1) { 
                setSisuls([...sisuls, ...RESPONSE.data.arrayResult]);
                setSisulHasNext(RESPONSE.data.pageCode == 1);
                setTotal(RESPONSE.data.totalCount);
            }
            setSisulIsNextLoading(false);
            setSisulNextIndex(sisulNextIndex => sisulNextIndex + 1);
        }, 2000);
    };

    const mamulLoadInitial = async () => {
        setMamulIsNextLoading(true);
        const RESPONSE = await getUserScrapSales({ userNo: USER_NO, page: 1 });
        console.log(RESPONSE);
        if(RESPONSE && RESPONSE.data.code === 1) { 
            setMamuls(RESPONSE.data.arrayResult);
            setMamulHasNext(RESPONSE.data.pageCode == 1);
            setTotal(RESPONSE.data.totalCount);
        }
        setMamulIsNextLoading(false);
        setMamulNextIndex(2);
    };

    const mamulLoadNext = async () => {
        setMamulIsNextLoading(true);
        const RESPONSE = await getUserScrapSales({ userNo: USER_NO, page: 1 });
        console.log(RESPONSE);
        setTimeout(function(){
            if(RESPONSE && RESPONSE.data.code === 1) { 
                setMamuls([...mamuls, ...RESPONSE.data.arrayResult]);
                setMamulHasNext(RESPONSE.data.pageCode == 1);
                setTotal(RESPONSE.data.totalCount);
            }
            setMamulIsNextLoading(false);
            setMamulNextIndex(mamulNextIndex => mamulNextIndex + 1);
        }, 2000);
    };

    const onCloseClick = () => { dispatch(deactivateMyScrap()) };

    const changeCategory = nav => {
        setCategory(Object.keys(SCRAP_CTG).filter(key => SCRAP_CTG[key].title === nav)[0]);
    };

    useEffect(() => {
        if(category === 'sisul') sisulLoadInitial();
        if(category === 'mamul') mamulLoadInitial();
    }, [category]);
    


    return (
        
        <Section
            title={ `찜 매물(${ total })` }
            themeColor={ isBrowser? "primary" : "secondary" }
            close={ isBrowser && true }
            back={ isMobile && true }
            onCloseClick={ onCloseClick }
            onBackClick={ onCloseClick }
            action={ false }
        >
            <ListTab 
                type={ "full" }
                navs={Object.keys(SCRAP_CTG).map(key => SCRAP_CTG[key].title)} 
                onNavClick={ changeCategory }
                contents={[
                    <CenterList 
                        type={ "sub" } 
                        centers={ mamuls } 
                        // loading={ loading }
                        // error={ error }  
                        hasNext={ sisulHasNext }
                        isNextLoading={ sisulIsNextLoading }
                        loadNext={ sisulLoadNext }
                    />,
                    <CenterList 
                        type={ "sub" } 
                        centers={ sisuls } 
                        // loading={ loading }
                        // error={ error }  
                        hasNext={ mamulHasNext }
                        isNextLoading={ mamulIsNextLoading }
                        loadNext={ mamulLoadNext }
                    />
                ]}
            />
        </Section>
    )
}

export default UserScrapContainer;