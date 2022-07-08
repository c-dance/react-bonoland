import React, { useEffect, useState } from 'react';
import {
    Center,
    Calculator,
    Top,
    Contents,
    Thumbnail,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Assets,
    Corp,
    Section,
    Table,
    Description,
    Envs,
    Env,
    Contact,
    Back,
    TabNavs,
    TabNav,
    TabCont, 
    ChartWrap
} from './CenterItemStyle';
import CenterAction from '../CenterAction/CenterAction';
import { useNavigate, useHistory } from 'react-router';
import ItemImg from '../../../assets/test/item-thumbnail.png';
import CorpImg from '../../../assets/test/card-corp.png';
import DoughnutChart from '../../Chart/DoughnutChart/DoughnutChart';
import RadarChart from '../../Chart/RadarChart/RadarChart';
import { isMobile } from 'react-device-detect';
import { Loading, Error, NoData } from '../../ui/Inform/Inform';
import { getLocalNumber, getNumber, getPyeong } from '../../../utils/number';
import { GET_MARKETS } from '../../../scheme/chart';
import CustomDoughnutChart from '../../Chart/CustomDoughnutChart/CustomDoughnutChart';

const CenterItem = ({ 
    center, 
    onContactClick,
    onCalcClick,
    loading, 
    error
}) => {

    const navigate = useNavigate();
    
    // UI FUNCTION
    const [ tabIdx, setTabIdx ] = useState(0);
    const [ accordion, setAccordion ] = useState(isMobile? false : true );
    const [ pyeongs, setPyeongs ] = useState([false, false, false]);

    const toggleTab = (idx) => { setTabIdx(idx); };
    const toggleAccordion = (accordian) => { setAccordion(!accordian); };

    if(center) {
        console.log(center["localStatistics"]);
    }

    // 평수 계산
    //console.log(getPyeong("1,234"));

    const togglePyeong = index => {
        setPyeongs(pyeongs => pyeongs.map((item, idx) => (idx === index)? !item : item));
    };

    return (
        <>
        { loading && Loading() }
        { error && Error("다시 시도해 주세요.") }
        {
            center &&
            <Center>
                <Calculator onClick={ () => onCalcClick() } />
                <Top>
                    <Accordion>
                        <AccordionSummary  onClick={ () => { isMobile && toggleAccordion(accordion); } }>
                            <h2 className="name">{`${center["sisul"]["adminPttnCd"]}(${center["sisul"]["toPer"]}인)`}</h2>
                        </AccordionSummary>
                        <AccordionDetails className={ accordion && "active" }>
                            <div className="num">{`매물번호:${center["sisulCustomNo"]}`}</div>
                            <div className="addr">{`${center["sisul"]["siDoCd"]} ${center["sisul"]["siGunGuCd"]} ${center["sisul"]["detailAddr"]}`}</div>
                        </AccordionDetails>
                    </Accordion>
                    <Back onClick={ () => navigate(-1)} ></Back>
                    <TabNavs>
                        <TabNav className={ tabIdx === 0 && "active" } onClick={() => toggleTab(0)}>상세정보</TabNav>
                        <TabNav className={ tabIdx === 1 && "active" } onClick={() => toggleTab(1)} >부동산</TabNav>
                    </TabNavs>
                </Top>
                <Contents>
                    <div>
                        <Thumbnail><img src={ center["sisulImage"]["sisulFilePath"] + center["sisulImage"]["sisulFileName"] } /></Thumbnail>
                        <TabCont active={tabIdx === 0}>
                            <div style={{ marginBottom: "30px" }}>
                                <CenterAction
                                    scrapped={center["zzimResult"] === 1}
                                    centerId={center["longTermAdminSym"]}
                                />
                            </div>
                            <Section>
                                <h3>매매 정보</h3>
                                <hr />
                                <Corp><a href={center["loansURL"]} target="_blank"><img src={ CorpImg } /></a></Corp>
                                <Table>
                                    <tbody>
                                        <tr>
                                            <th>실거래가</th>
                                            <td>{ `${center["tradingPrice"]}억` }</td>
                                        </tr>
                                        <tr>
                                            <th>투자</th>
                                            <td>{ `${center["investmentFee"]}억` }</td>
                                        </tr>
                                        <tr>
                                            <th>대출</th>
                                            <td>{ `${center["loans"]} 억` }</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Section>
                            <Section>
                                <h3>기본 정보</h3>
                                <hr />
                                <Corp>{
                                    center["company"].map(item => 
                                    <a href={item.companyURL.length > 0 ? item.companyURL : "#none"} target="_blank">
                                        <img src={item.companyLogo}/>
                                    </a> 
                                )}</Corp>
                                <Assets>
                                    <div>
                                        <em className="price">실거래가</em>
                                        <span>{ `${center["tradingPrice"]}억` }</span>
                                    </div>
                                    <div>
                                        <em className="invest">투자</em>
                                        <span>{ `${center["investmentFee"]}억` }</span>
                                    </div>
                                    <div>
                                        <em className="loan">대출</em>
                                        <span>{ `${center["loans"]} 억` }</span>
                                    </div>
                                </Assets>
                                <Table>
                                    <tbody>
                                        <tr>
                                            <th>기관</th>
                                            <td>{ center["sisul"]["adminPttnCd"] }</td>
                                        </tr>
                                        <tr>
                                            <th>정원</th>
                                            <td>{ `${center["sisul"]["toPer"]}인` }</td>
                                        </tr>
                                        <tr>
                                            <th>지정일</th>
                                            <td>{center["sisul"]["지정일"]}</td>
                                        </tr>
                                        <tr>
                                            <th>현원</th>
                                            <td>{`${center["sisul"]["toPer"]}인 / ${(center["sisul"]["maPer"] + center["sisul"]["fmPer"])}인 (대기 : ${center["sisul"]["rsvPer"]}인)`}</td>
                                        </tr>
                                        <tr>
                                            <th>인력현황</th>
                                            <td>{ 
                                                getLocalNumber(center["sisul"]["equipLong"] 
                                                    + center["sisul"]["hdOfce"] 
                                                    + center["sisul"]["socWel"]
                                                    + center["sisul"]["nur"]
                                                    + center["sisul"]["nurArticle"]
                                                    + center["sisul"]["recuProt1"]
                                                    + center["sisul"]["recuProt2"]
                                                    + center["sisul"]["recuProtDelay"]
                                                    + center["sisul"]["physicalMTret"]
                                                    + center["sisul"]["chargeDoc"]
                                                    + center["sisul"]["nut"]
                                                    + center["sisul"]["cook"]
                                                    + center["sisul"]["hygiPrsn"]
                                                    + center["sisul"]["ofceEmp"]
                                                    + center["sisul"]["mgmtPrsn"]
                                                    + center["sisul"]["suppPrsn"]
                                                )
                                            }</td>
                                        </tr>
                                        <tr>
                                            <th>교통편</th>
                                            <td>{center["sisul"]["tfMth"]}</td>
                                        </tr>
                                        <tr>
                                            <th>주차시설</th>
                                            <td>{center["sisul"]["pkngEquip"]}</td>
                                        </tr>
                                        <tr>
                                            <th>평가</th>
                                            <td>{center["totalRtg"]}</td>
                                        </tr>
                                        <tr>
                                            <th>최근거래</th>
                                            <td>{center["sisul"]["최근거래"]}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Section>
                            <Section>
                                <h3>환경정보</h3>
                                <hr />
                                <Envs>
                                    { center["sisulCategory"].includes("병/의원 근접") && <Env className="nursing">병/위원 근접</Env> }
                                    { center["sisulCategory"].includes("주택 밀집 지역") && <Env className="cluster">주택 밀집 지역</Env> }
                                    { center["sisulCategory"].includes("신도시") && <Env className="newTown">신도시</Env> }
                                    { center["sisulCategory"].includes("지가 상승 거래지역") && <Env className="rising">지가 상승<br/>거래 지역</Env> }
                                    { center["sisulCategory"].includes("역세권") && <Env className="traffic">역세권</Env> }
                                    { center["sisulCategory"].includes("중심상권") && <Env className="market">중심상권</Env> }
                                    { center["sisulCategory"].includes("출퇴근 용이") && <Env className="work">출퇴근 용이</Env> }
                                    { center["sisulCategory"].includes("아파트 밀집 지역") && <Env className="apt">아파트 밀집<br/>지역</Env> }
                                    { center["sisulCategory"].includes("가시성 높음") && <Env className="view">가시성 높음</Env> }
                                    { center["sisulCategory"].includes("최신 인테리어") && <Env className="interior">최신 인테리어</Env> }
                                    { center["sisulCategory"].includes("주간보호") && <Env className="dayCare">주간보호</Env> }
                                    { center["sisulCategory"].includes("주변 개발 계획") && <Env className="develop">주변 개발 계획</Env> }
                                    { center["sisulCategory"].includes("경관우수") && <Env className="park">경관우수</Env> }
                                    { center["sisulCategory"].includes("최신설비") && <Env className="equip">최신설비</Env> }
                                    { center["sisulCategory"].includes("재가시설 포함") && <Env className="homeCare">재가시설 포함</Env> }
                                    { center["sisulCategory"].includes("차량 포함") && <Env className="bus">차량 포함</Env> }
                                    { center["sisulCategory"].includes("관공서 근접") && <Env className="admin">관공서 근접</Env> }
                                </Envs>
                            </Section>
                            <Section>
                                <h3>상세 설명</h3>
                                <hr />
                                <Description>{ center["detailedDescription"]}</Description>
                            </Section>
                            <Section>
                                <h3>시장현황</h3>
                                <ChartWrap>
                                    {/* { 
                                        center["localStatistics"] && 
                                        (GET_MARKETS(center["localStatistics"])).map((item, idx) => (
                                            <DoughnutChart 
                                                key={ idx }
                                                data={ item }     
                                            />
                                        ))
                                    } */}
                                    { 
                                        center["localStatistics"] && 
                                        (GET_MARKETS(center["localStatistics"])).map((item, idx) => (
                                            <CustomDoughnutChart data={ item } />
                                        ))
                                    }
                                </ChartWrap>
                            </Section>
                            <Section>
                                <h3>보노지수</h3>
                                <hr />
                                <RadarChart 
                                    data={{
                                        total: getNumber(center["totalScore"]),
                                        scores: [{
                                                label: "시설평가 등급",
                                                value: getNumber(center["bonoFacEval"])
                                            },
                                            {
                                                label: "가산현황",
                                                value: getNumber(center["bonoCntrlCndtn"])
                                            },
                                            {
                                                label: "관리상태",
                                                value: getNumber(center["boboAddnStus"])
                                            }]
                                    }} 
                                />
                            </Section>
                        </TabCont>
                        <TabCont active={tabIdx === 1}>
                            <Section>
                                <h3>◈ 토지 정보</h3>
                                <div>
                                    <Table>
                                        <tbody>
                                            <tr>
                                                <th>면적</th>
                                                <td>
                                                    {center["sisul"]["lndpclAr"]}
                                                    <button className={ `sync ${pyeongs[0] && 'on'}` } onClick={ () => togglePyeong(0) }></button>
                                                    <span className='pyeong'>{ getPyeong(center["sisul"]["lndpclAr"]) }</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>지목</th>
                                                <td>{center["sisul"]["lndcgrCodeNm"]}</td>
                                            </tr>
                                            <tr>
                                                <th>용도지역</th>
                                                <td>{center["sisul"]["prposArea"]}</td>
                                            </tr>
                                            <tr>
                                                <th>이용상황</th>
                                                <td>{center["sisul"]["ladUseSittn"]}</td>
                                            </tr>
                                            <tr>
                                                <th>소유구분</th>
                                                <td>{center["sisul"]["posesnSeCodeNm"]}</td>
                                            </tr>
                                            <tr>
                                                <th>공시지가(m²)</th>
                                                <td>{ `${getLocalNumber(center["sisul"]["pblntfPclnd"])} m²` }</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Section>
                            <Section>
                                <h3>◈ 건물 정보</h3>
                                <div>
                                    <Table>
                                        <tbody>
                                            <tr>
                                                <th>주용도</th>
                                                <td>{center["sisul"]["mainPurpsCdNm"]}</td>
                                            </tr>
                                            <tr>
                                                <th>신축년도</th>
                                                <td>{center["sisul"]["a"]}</td>
                                            </tr>
                                            <tr>
                                                <th>건폐율</th>
                                                <td>{center["sisul"]["bcRat"]}</td>
                                            </tr>
                                            <tr>
                                                <th>용적률</th>
                                                <td>{center["sisul"]["vlRat"]}</td>
                                            </tr>
                                            <tr>
                                                <th>건축물 연면적</th>
                                                <td>
                                                    {center["sisul"]["totArea"]}
                                                    <button className={ `sync ${pyeongs[1] && 'on'}` } onClick={ () => togglePyeong(1) }></button>
                                                    <span className='pyeong'>{ getPyeong(center["sisul"]["totArea"]) }</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>3층 면적</th>
                                                <td>
                                                    {center["sisul"]["b"]}
                                                    <button className={ `sync ${pyeongs[2] && 'on'}` } onClick={ () => togglePyeong(2) }></button>
                                                    <span className='pyeong'>{ getPyeong(center["sisul"]["b"]) }</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>규모</th>
                                                <td>{center["sisul"]["c"]}</td>
                                            </tr>
                                            <tr>
                                                <th>주차대수</th>
                                                <td>{center["sisul"]["d"]}</td>
                                            </tr>
                                            <tr>
                                                <th>승강기</th>
                                                <td>{center["sisul"]["e"]}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Section>
                        </TabCont>
                    </div>
                </Contents>
                <Contact onClick={ () => onContactClick() }>문의하기</Contact>
            </Center>
        }
        </>
    )
};

export default CenterItem;
