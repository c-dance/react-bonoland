import React, { useState, useEffect } from 'react';
import AddressFilter from "../../components/filters/AddressFilter/AddressFilter";
import { useDispatch } from 'react-redux';
import { getRegionByLatlng, getSearchByAddress } from '../../utils/map';
import { activateAlert } from '../../store/actions/alert';
import { updateFilter } from '../../store/actions/filter';
import { updateMapFilter } from '../../store/actions/map';

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
                dispatch(updateFilter({ zoom: res.zoom, latlng: res.latlng }));
                dispatch(updateMapFilter({ zoom: res.zoom, latlng: res.latlng, geoAddress: res.address }));
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