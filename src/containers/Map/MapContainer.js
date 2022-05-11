import React, { useState } from 'react';
import Map from '../../components/Map/Map';
import { useSelector, useDispatch } from 'react-redux';
import { updateMapGeolocation, updateMapZoomLevel } from '../../store/actions';



const MapContainer = () => {
    const geolocation = useSelector(state => state.Map.geolocation );
    const dispatch = useDispatch();
    
    console.log(geolocation);
    
    const moveLocation = (event) => {
        dispatch(updateMapGeolocation(event.currentTarget.value));
        console.log(geolocation);
    };
   
    return (
        <Map geolocation={geolocation} moveLocation={ moveLocation } />
    )
};

export default MapContainer;