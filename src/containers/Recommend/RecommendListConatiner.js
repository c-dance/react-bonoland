import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CenterList from '../../components/Center/CenterList/CenterList';
import ListHeader from '../../components/List/ListHead/ListHead';
import ListTab from '../../components/List/ListTab/ListTab';
import Panel from '../../components/ui/Panel/Panel'
import { getCategoryCenters } from '../../api/centers';
import AddressFilterContainer from '../filters/AddressFilterContainer';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { updateFilter } from '../../store/actions/filter';

const RECOMMENDS_CTG = {
    biz: {
        title: '신규 사업지',
        index: 0, 
        category2: '사업지', 
        url: '/recommend/biz',
        navs: ['신규 사업지', '신규 리모델링'],
        head: '추천매물'
    },
    remodeling: {
        title: '신규 리모델링', 
        index: 1,
        category2: '리모델링',
        url: '/recommend/remodeling',
        navs: ['신규 사업지', '신규 리모델링'],
        head: '추천매물'
    },
    nursing: {
        title: '요양원',
        index: 0,
        category2: '요양원',
        url: '/sales/nursing',
        navs: ['요양원', '주간보호'],
        head: '시설매물'
    },
    care: {
        title: '주간보호',
        index: 1,
        category2: '주야간',
        url: '/sales/care',
        navs: ['요양원', '주간보호'],
        head: '시설매물'
    }
}

const RecommendListContainer = () => {

    let PARAMS = useParams().category;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const FILTER = useSelector(state => state.Filter);
    const MAP_INFO = useSelector(state => state.Map.infos);
    const USER_NO = useSelector(state => state.User.userInfo.no);

    const [ category, setCategory ] = useState(PARAMS);

    const [ nextIndex, setNextIndex ] = useState(1);
    const [ hasNext, setHasNext ] = useState(false);
    const [ isNextLoading, setIsNextLoading ] = useState(false);

    const [ centers, setCenters ] = useState(null);

    const onNavClick = (nav) => {
        const ctgParams = Object.keys(RECOMMENDS_CTG).filter(key => RECOMMENDS_CTG[key].title === nav)[0];
        navigate(RECOMMENDS_CTG[ctgParams].url);
    };

    const loadNext = async () => {
        setIsNextLoading(true);
        console.log(`====== 추천/시설매물 ${FILTER.category} ${nextIndex}페이지 데이터 요청 ========`);
        const RESPONSE = await loadInitial({
            x: FILTER.latlng[0],
            y: FILTER.latlng[1],
            zoom: FILTER.zoom,
            userNo: USER_NO,
            category2: FILTER.category2,
            page: nextIndex
        });
        setTimeout(function(){
            if(RESPONSE && RESPONSE.data.code ===1) {
                setCenters([...centers, ...RESPONSE.data.arrayResult]);
                setHasNext(RESPONSE.data.pageCode === 1);
            }
            setIsNextLoading(false);
            setNextIndex(nextIndex => nextIndex + 1);
        }, 2000)
    };

    const loadInitial = async option => {
        setIsNextLoading(true);
        const RESPONSE = await getCategoryCenters(option);
        console.log(`추천/시설매물 ${option.category2} 첫 데이터 요청: `, RESPONSE);
        if(RESPONSE && RESPONSE.data.code ===1) {
            setCenters(RESPONSE.data.arrayResult);
            setHasNext(RESPONSE.data.pageCode === 1);
        } else {
            console.log('값 없음: ', RESPONSE.data.message || '오류 발생');
            setCenters(null);
            setHasNext(false);
        }
        setIsNextLoading(false);
        setNextIndex(2);
    }

    useEffect(() => {
        if(FILTER.category2) {
            console.log('필터 변경시 목록 페이지1 부터 리로딩 ==========');
            loadInitial({
                x: FILTER.latlng[0],
                y: FILTER.latlng[1],
                zoom: FILTER.zoom,
                userNo: USER_NO,
                category2: FILTER.category2,
                page: 1
            });
        }
    }, [FILTER]);

    useEffect(() => {
        setCategory(PARAMS);
        dispatch(updateFilter({
            latlng: [37.500459022881195, 126.77429450460129],
            zoom: 8,
            category2: RECOMMENDS_CTG[PARAMS].category2
        }))
    }, [PARAMS]);


    return (
        <Panel>
            <ListHeader title={RECOMMENDS_CTG[category].head}>
                <AddressFilterContainer type="sub" />
            </ListHeader>
            <ListTab 
                navs={RECOMMENDS_CTG[category].navs} 
                onNavClick={ onNavClick }
                active={RECOMMENDS_CTG[category].index}
                contents={[
                    <CenterList 
                        list={category} 
                        centers={ centers } 
                        hasNext={ hasNext }
                        isNextLoading={ isNextLoading }
                        loadNext={ loadNext }
                    />
                ]}
            />
        </Panel>
    )
}

export default RecommendListContainer;