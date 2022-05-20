import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useFetch } from '../../hooks';
import CenterItem from "../../components/Center/CenterItem/CenterItem";
import DoughnutChart from "../../components/Chart/DoughnutChart/DoughnutChart";
import RadarChart from "../../components/Chart/RadarChart/RadarChart";

const CenterItemContainer = () => {
    const { id } = useParams();
    const [page, data] = useFetch({}, '/data/center.json');

    return (
        <>
        { page === "success" &&         
            <CenterItem 
                data = { data } 
            />
        }
        {
            page !== "success" &&
            <div>none</div>
        }
        </>
    )
};

export default CenterItemContainer;