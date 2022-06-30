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
import { getLocalNumber, getPyeong } from '../../../utils/number';

const CenterItem = ({ 
    center, 
    onContactClick,
    onCalcClick,
    loading, 
    error,
    noData
}) => {

    const navigate = useNavigate();
    
    // UI FUNCTION
    const [ tabIdx, setTabIdx ] = useState(0);
    const [ accordion, setAccordion ] = useState(isMobile? false : true );

    const toggleTab = (idx) => { setTabIdx(idx); };
    const toggleAccordion = (accordian) => { setAccordion(!accordian); };

    // 평수 계산
    //console.log(getPyeong("1,234"));

    console.log(center);

    return (
        <>
        { loading && Loading() }
        { error && Error("다시 시도해 주세요.") }
        { noData && NoData("기관을 찾을 수 없습니다.") }
        {
            center && Object.keys(center).length > 0 &&
            <Center>
                <Calculator onClick={ () => onCalcClick() } />
                <Top>
                    <Accordion>
                        <AccordionSummary  onClick={ () => { isMobile && toggleAccordion(accordion); } }>
                            <h2 className="name">{`${center["sisul"]["adminPttnCd"]}(${center["정원"]}인)`}</h2>
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
                        <Thumbnail><img src={ ItemImg } /></Thumbnail>
                        <TabCont active={tabIdx === 0}>
                            <div style={{ marginBottom: "30px" }}>
                                <CenterAction
                                    scrapped={false}
                                    centerId={"0"}
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
                                <Corp><img src={ CorpImg } /></Corp>
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
                                            <td>{ `${center["sisul"]["정원"]}}인` }</td>
                                        </tr>
                                        <tr>
                                            <th>지정일</th>
                                            <td>{center["sisul"]["지정일"]}</td>
                                        </tr>
                                        <tr>
                                            <th>현원</th>
                                            <td>{`${center["sisul"]["toPer"]}인 / ${center["sisul"]["정원"]}인 (대기 : ${center["sisul"]["대기"]}인)`}</td>
                                        </tr>
                                        <tr>
                                            <th>인력현황</th>
                                            <td>{center["sisul"]["인력현황"]}</td>
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
                                            <td>{center["sisul"]["평가"]}</td>
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
                                    { center["sisul"]["병/의원 근접"] && <Env className="nursing">병/위원 근접</Env> }
                                    { center["sisul"]["주택밀집지역"]  && <Env className="cluster">주택 밀집 지역</Env> }
                                    { center["sisul"]["신도시"]  && <Env className="newTown">신도시</Env> }
                                    { center["sisul"]["지가상승거래지역"]  && <Env className="rising">지가 상승<br/>거래 지역</Env> }
                                    { center["sisul"]["역세권"]  && <Env className="traffic">역세권</Env> }
                                    { center["sisul"]["중심상권"]  && <Env className="market">중심상권</Env> }
                                    { center["sisul"]["대로변"]  && <Env className="road">대로변</Env> }
                                </Envs>
                            </Section>
                            <Section>
                                <h3>상세 설명</h3>
                                <hr />
                                <Description>{ center["detailedDescription"]}</Description>
                            </Section>
                            <Section>
                                {/* <h3>시장현황</h3>
                                <ChartWrap>
                                    { 
                                        center["시장 현황"] && 
                                        Object.keys(center["시장 현황"]).map((key, idx) => (
                                            <DoughnutChart 
                                                key={ idx }
                                                title={ key } 
                                                data={ center["시장 현황"][`${key}`] }     
                                            />
                                        ))
                                    }
                                </ChartWrap> */}
                            </Section>
                            <Section>
                                <h3>보노지수</h3>
                                {/* <hr />
                                {
                                    center["보노지수"] &&
                                    <RadarChart 
                                        data={ center["보노지수"] } 
                                    />
                                } */}
                            </Section>
                        </TabCont>
                        <TabCont active={tabIdx === 1}>
                            <Section>
                                <h3>◈ 토지 정보</h3>
                                <div>
                                    {/* <Table>
                                        <tbody>
                                            <tr>
                                                <th>면적</th>
                                                <td>
                                                    {center["토지정보"]["면적"]}
                                                    <button className="sync"></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>지목</th>
                                                <td>{center["토지정보"]["지목"]}</td>
                                            </tr>
                                            <tr>
                                                <th>용도지역</th>
                                                <td>{center["토지정보"]["용도지역"]}</td>
                                            </tr>
                                            <tr>
                                                <th>이용상황</th>
                                                <td>{center["토지정보"]["이용상황"]}</td>
                                            </tr>
                                            <tr>
                                                <th>소유구분</th>
                                                <td>{center["토지정보"]["소유구분"]}</td>
                                            </tr>
                                            <tr>
                                                <th>공시지가(m²)</th>
                                                <td>{ getLocalNumber(center["토지정보"]["공시지가(m²)"]) }</td>
                                            </tr>
                                        </tbody>
                                    </Table> */}
                                </div>
                            </Section>
                            <Section>
                                <h3>◈ 건물 정보</h3>
                                <div>
                                    {/* <Table>
                                        <tbody>
                                            <tr>
                                                <th>주용도</th>
                                                <td>{center["건물정보"]["주용도"]}</td>
                                            </tr>
                                            <tr>
                                                <th>신축년도</th>
                                                <td>{center["건물정보"]["신축년도"]}</td>
                                            </tr>
                                            <tr>
                                                <th>건폐율</th>
                                                <td>{center["건물정보"]["건폐율"]}</td>
                                            </tr>
                                            <tr>
                                                <th>용적률</th>
                                                <td>{center["건물정보"]["용적률"]}</td>
                                            </tr>
                                            <tr>
                                                <th>건축물 연면적</th>
                                                <td>
                                                    {center["건물정보"]["건축물 연면적"]}
                                                    <button className="sync"></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>3층 면적</th>
                                                <td>
                                                    {center["건물정보"]["3층 면적"]}
                                                    <button className="sync"></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>규모</th>
                                                <td>{center["건물정보"]["규모"]}</td>
                                            </tr>
                                            <tr>
                                                <th>주차대수</th>
                                                <td>{center["건물정보"]["주차대수"]}</td>
                                            </tr>
                                            <tr>
                                                <th>승강기</th>
                                                <td>{center["건물정보"]["승강기"]}</td>
                                            </tr>
                                        </tbody>
                                    </Table> */}
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
