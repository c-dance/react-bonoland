import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import CenterItem from "../../components/Center/CenterItem/CenterItem";

const CenterItemContainer = () => {
    const { id } = useParams();
    const [ centerID, setCenterID ] = useState(id);
    const [ center, setCenter ] = useState({});

    const fetchCenter = () => {
        fetch('./data/center.json')
            .then(res => res.json)
            .then(data => setCenter(data))
            .catch(err => {
                console.log(err);
                setCenter(null);
            })
    };

    useEffect(() => {
        fetchCenter();
    }, [centerID])

    return (
        <CenterItem center= { center } />
    )
};

export default CenterItemContainer;