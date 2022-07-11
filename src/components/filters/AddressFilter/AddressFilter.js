import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { AddressForm, Home } from "./AddressFilterStyle";
import { isMobile } from "react-device-detect";
import { useDispatch } from "react-redux";
import { resetFilter } from "../../../store/actions/filter";

const AddressFilter = ({ type, adress, onAddressChange, onAddressSubmit }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const onHomeClick = () => {
        location === '/'? window.location.reload() : navigate('/');
        dispatch(resetFilter());
    };

    return (
        <AddressForm 
            onSubmit={ event => onAddressSubmit(event)}
            className={ type === "main" && "main" }
        >
            { isMobile && <Home type="button" onClick={() => onHomeClick() } /> }
            <input 
                type="text" 
                placeholder="지역구, 지역명으로 검색하세요."
                value={ adress }
                onChange={ event => onAddressChange(event) }
                id="autocomplete"
            />
            <button type="submit">검색</button>
        </AddressForm>
        
    )
}

export default AddressFilter;