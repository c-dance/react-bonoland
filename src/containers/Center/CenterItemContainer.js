import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useFetch } from '../../hooks';
import Panel from "../../components/ui/Panel/Panel";
import CenterItem from "../../components/Center/CenterItem/CenterItem";

const CenterItemContainer = () => {
    const { id } = useParams();
    const [page, data] = useFetch({}, '/data/center.json');

    return (
        <Panel
            type={ "side" }
            position={ "left" }
            fold={ true }
        >
            { page === "success" &&   
                
                <CenterItem 
                    data = { data } 
                />
            }
            {
                page !== "success" &&
                <div>none</div>
            }
        </Panel>
    )
};

export default CenterItemContainer;