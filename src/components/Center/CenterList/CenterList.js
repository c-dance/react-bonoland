import { CardList, CardDivider, ListWrap } from './CenterListStyle';
import CenterCard from "../CenterCard/CenterCard";

const CenterList = ({ type, centers }) => {
    return (
        centers.length > 0 && <CardList type={ type }>
            <ListWrap>
            {
                centers.map(center => 
                    <>
                        <CenterCard center= { center } />
                        <CardDivider />
                    </>
                )
            }
            </ListWrap>
        </CardList>

        || centers.length <= 0 && <div>목록 없음</div>
    )
}

export default CenterList;