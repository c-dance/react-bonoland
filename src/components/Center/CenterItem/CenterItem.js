import React, { useEffect, useState } from 'react';
import {
    Center,
    Top,
    Contents,
    Thumbnail,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Assets,
    Corp,
    Actions, 
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
import { useNavigate } from 'react-router';
import ItemImg from '../../../assets/test/item-thumbnail.png';
import CorpImg from '../../../assets/test/card-corp.png';
import DoughnutChart from '../../Chart/DoughnutChart/DoughnutChart';
import RadarChart from '../../Chart/RadarChart/RadarChart';
import { isMobile } from 'react-device-detect';
import { Loading, Error, NoData } from '../../ui/Inform/Inform';
import { getLocalNumber } from '../../../utils/number';

const CenterItem = ({ 
    center, 
    onContactClick ,
    loading, 
    error,
    noData
}) => {

    const navifate = useNavigate();
    
    // UI FUNCTION
    const [ tabIdx, setTabIdx ] = useState(0);
    const [ accordion, setAccordion ] = useState(isMobile? false : true );

    const toggleTab = (idx) => { setTabIdx(idx); };
    const toggleAccordion = (accordian) => { setAccordion(!accordian); };

    return (
        <>
        { loading && Loading() }
        { error && Error("다시 시도해 주세요.") }
        { noData && NoData("기관을 찾을 수 없습니다.") }
        {
            center && Object.keys(center).length > 0 &&
            <Center>
                <Top>
                    <Accordion>
                        <AccordionSummary  onClick={ () => { isMobile && toggleAccordion(accordion); } }>
                            <h2 className="name">{`${center["기관"]}(${center["기본정보"]["정원"]}인)`}</h2>
                        </AccordionSummary>
                        <AccordionDetails className={ accordion && "active" }>
                            <div className="num">{`매물번호:${center["매물번호"]}`}</div>
                            <div className="addr">{ center["주소"] }</div>
                        </AccordionDetails>
                    </Accordion>
                    <Back onClick={ () => navifate(-1)} ></Back>
                    <TabNavs>
                        <TabNav active={tabIdx === 0} onClick={() => toggleTab(0)}>상세정보</TabNav>
                        <TabNav active={tabIdx === 1} onClick={() => toggleTab(1)} >부동산</TabNav>
                    </TabNavs>
                </Top>
                <Contents>
                    <div>
                        <Thumbnail><img src={ ItemImg } /></Thumbnail>
                        <TabCont active={tabIdx === 0}>
                            <Actions>
                                <button className="scrap"></button>
                                <button className="share"></button>
                            </Actions>
                            <Section>
                                <h3>기본 정보</h3>
                                <hr />
                                <Corp><img src={ CorpImg } /></Corp>
                                <Assets>
                                    <div>
                                        <em className="price">실거래가</em>
                                        <span>{ center["기본정보"]["실거래가"] }</span>
                                    </div>
                                    <div>
                                        <em className="invest">투자</em>
                                        <span>{ center["기본정보"]["투자"] }</span>
                                    </div>
                                    <div>
                                        <em className="loan">대출</em>
                                        <span>{ center["기본정보"]["대출"]}</span>
                                    </div>
                                </Assets>
                                <Table>
                                    <tbody>
                                        <tr>
                                            <th>기관</th>
                                            <td>{ center["기본정보"]["기관"] }</td>
                                        </tr>
                                        <tr>
                                            <th>정원</th>
                                            <td>{ `${center["기본정보"]["정원"]}}인` }</td>
                                        </tr>
                                        <tr>
                                            <th>지정일</th>
                                            <td>{center["기본정보"]["지정일"]}</td>
                                        </tr>
                                        <tr>
                                            <th>현원</th>
                                            <td>{`${center["기본정보"]["현원"]}인 / ${center["기본정보"]["정원"]}인 (대기 : ${center["기본정보"]["대기"]}인)`}</td>
                                        </tr>
                                        <tr>
                                            <th>인력현황</th>
                                            <td>{center["기본정보"]["인력현황"]}</td>
                                        </tr>
                                        <tr>
                                            <th>교통편</th>
                                            <td>{center["기본정보"]["교통편"]}</td>
                                        </tr>
                                        <tr>
                                            <th>주차시설</th>
                                            <td>{center["기본정보"]["주차시설"]}</td>
                                        </tr>
                                        <tr>
                                            <th>평가</th>
                                            <td>{center["기본정보"]["평가"]}</td>
                                        </tr>
                                        <tr>
                                            <th>최근거래</th>
                                            <td>{center["기본정보"]["최근거래"]}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Section>
                            <Section>
                                <h3>환경정보</h3>
                                <hr />
                                <Envs>
                                    { center["환경정보"]["병/의원 근접"] && <Env className="nursing">병/위원 근접</Env> }
                                    { center["환경정보"]["주택밀집지역"]  && <Env className="cluster">주택 밀집 지역</Env> }
                                    { center["환경정보"]["신도시"]  && <Env className="newTown">신도시</Env> }
                                    { center["환경정보"]["지가상승거래지역"]  && <Env className="rising">지가 상승<br/>거래 지역</Env> }
                                    { center["환경정보"]["역세권"]  && <Env className="traffic">역세권</Env> }
                                    { center["환경정보"]["중심상권"]  && <Env className="market">중심상권</Env> }
                                    { center["환경정보"]["대로변"]  && <Env className="road">대로변</Env> }
                                </Envs>
                            </Section>
                            <Section>
                                <h3>상세 설명</h3>
                                <hr />
                                <Description>{ center["상세 설명"]}</Description>
                            </Section>
                            <Section>
                                <h3>시장현황</h3>
                                <ChartWrap>
                                    {/* { 
                                        center["시장 현황"] && 
                                        Object.keys(center["시장 현황"]).map((key, idx) => (
                                            <DoughnutChart 
                                                key={ idx }
                                                scheme={ key } 
                                                data={ center["시장 현황"][`${key}`] }     
                                            />
                                        ))
                                    } */}
                                </ChartWrap>
                            </Section>
                            <Section>
                                <h3>보노지수</h3>
                                <hr />
                                {/* {
                                    center["보노지수"] &&
                                    <RadarChart 
                                        scheme={ "보노지수" } 
                                        data={ center["보노지수"] } 
                                    />
                                } */}
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
