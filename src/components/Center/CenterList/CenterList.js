import { CardList, CardDivider, ListWrap } from './CenterListStyle';
import CenterCard from "../CenterCard/CenterCard";
import { isMobile } from 'react-device-detect';
import React from "react";

const CenterList = ({ type, centers }) => {

    console.log(centers);

    return (
        centers.length > 0 && 
        <CardList type={ type }>
            <ListWrap>
            {
                centers.map(( center, idx ) => 
                    <div key={ idx }>
                        <CenterCard type={ type } center = { center } />
                        <CardDivider />
                    </div>
                )
            }
            </ListWrap>
        </CardList>

        || centers.length <= 0 && <div>목록 없음</div>
    )
}

export default CenterList;