import { CardList, CardDivider, ListWrap } from './CenterListStyle';
import CenterCard from "../CenterCard/CenterCard";
import { Loading, NoData, Error } from '../../ui/Inform/Inform';
import React from "react";

const CenterList = ({
    list,
    type, 
    centers,
    loading,
    error,
    noData
}) => {
    return (
        <CardList type={ type }>
            <ListWrap>
            { loading && Loading() }
            { error && Error() }
            { noData && NoData() }
            {
                centers && centers.length > 0 &&
                centers.map(( center, idx ) => 
                <div key={ idx }>
                    <CenterCard list={list} type={ type } center = { center } />
                    <CardDivider />
                </div>
                )
            }
            </ListWrap>
        </CardList>
    )
}

export default CenterList;