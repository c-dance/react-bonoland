import React, { useState } from 'react';
import AddressFilter from "../../components/filters/AddressFilter/AddressFilter";
import { useDispatch } from 'react-redux';
import { getSearchByAddress } from '../../utils/map';
import { updateMapFilter, updateMapInfos } from '../../store/actions/map';
import { activateAlert } from '../../store/actions/alert';
import { updateFilter } from '../../store/actions/filter';

const AddressFilterContainer = ({ type }) => {

    const dispatch = useDispatch();

    const [ address, setAddress ] = useState('');

    const onAddressChange = event => {
        setAddress(event.currentTarget.value);
    };

    const onAddressSubmit = async event => {
        event.preventDefault();

        await getSearchByAddress(address)
        .then(res => {
            if(res){
                // 검색 필터와 지도 속성 다르게 줌(대안 1)
                dispatch(updateFilter(res));
                // dispatch(updateMapInfos({
                //     zoom: res.zoom,
                //     region: res.region,
                //     latlng: res.latlng
                // }));
                
                // dispatch(updateMapFilter(res));
            } else {
                dispatch(activateAlert({
                    title: "검색 결과",
                    contents: "검색 지역을 찾을 수 없습니다. 다시 시도해 주세요."
                }))
            }
        })
        .catch(err => {
            dispatch(activateAlert({
                title: "검색 결과",
                contents: "검색 지역을 찾을 수 없습니다. 지역명을 정확히 입력해 주세요."
            }))
        })
    };

    return (
        <AddressFilter 
            type={ type } 
            address = { address }
            onAddressChange = { onAddressChange }
            onAddressSubmit = { onAddressSubmit }
        />
    )
};  

export default AddressFilterContainer;