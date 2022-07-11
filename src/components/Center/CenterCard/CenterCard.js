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
import React from "react";
import { getLocalNumber } from '../../../utils/number';

const CenterCard = ({ list, type, center }) => {

    return (
        <>
            {
                center && Object.keys(center).length > 0 &&
                <Card className={ type }>
                    { 
                        type ==="sub" && 
                        <Head>{`${center["adminPttnCd"]} ${center["toPer"]}인 ${center["bonoForm"]}`}</Head> 
                    }
                    <Wrap to={ `/center/${center["longTermAdminSym"]}` }>
                        {
                            type !== "abstract" &&
                            <Thumbnail>
                                <img src={ center["sisulImage"]["sisulFilePath"] + center["sisulImage"]["sisulFileName"] } alt="보노매물" />
                            </Thumbnail>
                        }
                        <Sales>
                            <Num><span>매물번호: {center["longTermAdminSym"]}</span></Num>
                            { 
                                type !== "abstract" && 
                                <>
                                    <Cate>{center["bonoForm"] || center["sisulCustom"]["sisulState"]}</Cate>
                                    <Corp>{
                                        Array.isArray(center["company"])? 
                                        center["company"].map(item => <img src={item.companyLogo}/>)
                                        : <img src={center["company"].companyLogo}/>
                                    }</Corp>
                                </>
                            } 
                            {
                                center["bonoDivision"] && type !== "sub" &&
                                <Badges>
                                    {center["bonoDivision"].includes('추천') && <div className='recommend'>추천</div>}
                                    {center["bonoDivision"].includes('프리미엄') && <div className='premium'>프리미엄</div> }
                                </Badges>
                            }
                            {
                                type === "abstract" && 
                                <Name>{`${ center["adminPttnCd"] || center["sisul"]["adminPttnCd"]} ${ center["toPer"] || center["sisul"]["toPer"]}인`}</Name>
                            }
                            <Region>{`${center["siDoCd"] || center["sisul"]["siDoCd"]} ${ center["siGunGuCd"] || center["sisul"]["siGunGuCd"]}`}</Region>
                            <Price>{`매매 ${getLocalNumber(center["tradingPrice"] || center["sisulCustom"]["tradingPrice"])} 억`}</Price>
                            <Infos>
                                <span>{`${center["adminPttnCd"]}, 연면적 ${getLocalNumber(center["totArea"])}m²`}</span>
                                <span>{`[현원 ${center["maPer"] + center["fmPer"]}인/정원${center["toPer"]}인]`}</span>
                            </Infos>
                            {
                                type !== "abstract" && 
                                <Assets>
                                    <div>
                                        <em className='invest'>투자</em>
                                        <span className='value'>{center["investmentFee"] || center["sisulCustom"]["investmentFee"]}억</span>
                                    </div>
                                    <div>
                                        <em className='loan'>대출</em>
                                        <span className='value'>{center["loans"] || center["sisulCustom"]["loans"]}억</span>
                                    </div>
                                </Assets>
                            }
                        </Sales>
                    </Wrap>
                    {
                        type !== "abstract" && 
                        <CenterAction 
                            scrapped={center["zzimResult"] === 1}
                            centerId={center["longTermAdminSym"]}     
                        />
                    }
                </Card>
            }
        </>
    )
};

export default CenterCard;