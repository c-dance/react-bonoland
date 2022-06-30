import {
    Card,
    Head,
    Wrap,
    Thumbnail,
    Sales,
    Cate,
    Corp,
    Num,
    Badges,
    Name,
    Region,
    Price,
    Infos,
    Assets
} from './CenterCardStyle';
import CenterAction from '../CenterAction/CenterAction';
//테스트 사진
import ThumbImg from '../../../assets/test/card-thumbnail.png';
import CorpImg from '../../../assets/test/card-corp.png';
import React from "react";
import { getLocalNumber } from '../../../utils/number';
import { useLocation } from 'react-router';

const LIST_PATH = ["/", "recommend", "sales"];

const CenterCard = ({ list, type, center }) => {

    // const CENTER_PATH = (centerNo, isBono) => {
    //     if(list && list.length > 0) {
    //         const parentPath = list === "main"? "" : "/" + list;
    //         return parentPath + `/center/${centerId}`
    //     } else {
    //         const currentPath = useLocation().pathname.split('/')[1];
    //         let parentPath = LIST_PATH.filter(pathName => pathName === currentPath)[0] || "";
    //         if(parentPath.length > 0) parentPath = "/" + parentPath;
    //         return parentPath + `/center/${centerId}` 
    //     }
    // };

    const CENTER_PATH = centerNo => {
        return `center/${centerNo}`
    };

    return (
        <>
            {
                center && Object.keys(center).length > 0 &&
                <Card className={ type === "abstract" && 'abstract' }>
                    { 
                        type ==="sub" && 
                        <Head>{`${center["sisul"]["adminPttnCd"]} ${center["정원"]}인 시설 ${center["sisulState"]}`}</Head> 
                    }
                    <Wrap to={ CENTER_PATH(center["longTermAdminSym"]) }>
                        {
                            type !== "abstract" &&
                            <Thumbnail>
                                <img src={ ThumbImg } alt="보노매물" />
                            </Thumbnail>
                        }
                        <Sales>
                            <Num><span>매물번호: {center["sisulCustomNo"]}</span></Num>
                            { 
                                type !== "abstract" && 
                                <>
                                    <Cate>{center["bonoForm"]}</Cate>
                                    <Corp><img src={ CorpImg } /></Corp>
                                </>
                            } 
                            <Badges>
                                {center["bonoDivision"].includes('추천') && <div className='recommend'>추천</div>}
                                {center["bonoDivision"].includes('프리미엄') && <div className='premium'>프리미엄</div> }
                            </Badges>
                            {
                                type === "abstract" && 
                                <Name>{`${center["sisul"]["adminPttnCd"]} ${center["정원"]}인`}</Name>
                            }
                            <Region>{`${center["sisul"]["siDoCd"]} ${center["sisul"]["siGunGuCd"]}`}</Region>
                            <Price>{`매매 ${getLocalNumber(center["tradingPrice"])} 억`}</Price>
                            <Infos>
                                <span>{`${center["sisul"]["adminPttnCd"]}, 연면적 ${getLocalNumber(center["sisul"]["totArea"])}m²`}</span>
                                <span>{`[현원 ${center["sisul"]["toPer"]}인/정원${center["정원"]}인]`}</span>
                            </Infos>
                            {
                                type !== "abstract" && 
                                <Assets>
                                    <div>
                                        <em className='invest'>투자</em>
                                        <span className='value'>{center["investmentFee"]}억</span>
                                    </div>
                                    <div>
                                        <em className='loan'>대출</em>
                                        <span className='value'>{center["loans"]}억</span>
                                    </div>
                                </Assets>
                            }
                        </Sales>
                    </Wrap>
                    {
                        type !== "abstract" && 
                        <CenterAction 
                            scrapped={ false }
                            centerId={"0"}     
                        />
                    }
                </Card>
            }
        </>
    )
};

export default CenterCard;