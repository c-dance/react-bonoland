import React, { useState } from 'react';
import AddressFilter from "../../components/filters/AddressFilter/AddressFilter";
import { getSearchByAddress } from '../../utils/map';
import { useDispatch } from 'react-redux';
import { updateMapFilter, updateMapProps } from '../../store/actions/map';
import { activateAlert } from '../../store/actions/alert';

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
                    dispatch(updateMapFilter(res));
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