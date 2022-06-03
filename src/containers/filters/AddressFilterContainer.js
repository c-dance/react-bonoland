import React, { useState } from 'react';
import AddressFilter from "../../components/filters/AddressFilter/AddressFilter";
import { getSearchByAddress } from '../../utils/map';
import { useDispatch } from 'react-redux';
import { updateMapFilter, updateMapProps } from '../../store/actions/map';

const AddressFilterContainer = ({ type }) => {

    const dispatch = useDispatch();

    const [ address, setAddress ] = useState('');

    const onAddressChange = event => {
        setAddress(event.currentTarget.value);
    };

    const onAddressSubmit = async event => {
        const result = await getSearchByAddress(address);

        if(result === null) return;
        dispatch(updateMapFilter(result));
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