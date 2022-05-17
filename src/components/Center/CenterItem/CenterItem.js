import React, { useState } from 'react';
import {
    Center,
    Top,
    Contents,
    Thumbnail,
    Accordian,
    AccordianSummary,
    AccordianDetails,
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
    TabCont
} from './CenterItemStyle';
import ItemImg from '../../../assets/test/item-thumbnail.png';
import CorpImg from '../../../assets/test/card-corp.png';

const CenterItem = ({ center }) => {
    
    // 상세정보|부동산 탭 & 상단 아코디언
    const [ tabIdx, setTabIdx ] = useState(0);
    const [ accordian, setAccordian ] = useState(true);

    const toggleTab = (idx) => { setTabIdx(idx); };
    const toggleAccordian = () => { setAccordian(!accordian); };

    return (
        <Center>
            <Top>
                <Back></Back>
                <Accordian>
                    <AccordianSummary>
                        <h2 className="name" onClick={ () => toggleAccordian() }>주야간 보호센터 (39인)</h2>
                    </AccordianSummary>
                    <AccordianDetails active={ accordian }>
                        <div className="num">매물번호: 1</div>
                        <div className="addr">서울특별시 마포구 고덕동</div>
                    </AccordianDetails>
                </Accordian>
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
                                    <span>20억</span>
                                </div>
                                <div>
                                    <em className="invest">투자</em>
                                    <span>20억</span>
                                </div>
                                <div>
                                    <em className="loan">대출</em>
                                    <span>20억</span>
                                </div>
                            </Assets>
                            <Table>
                                <tr>
                                    <th>기관</th>
                                    <td>주야간 보호센터</td>
                                </tr>
                                <tr>
                                    <th>정원</th>
                                    <td>39인</td>
                                </tr>
                                <tr>
                                    <th>지정일</th>
                                    <td>2021년 2월 5일</td>
                                </tr>
                                <tr>
                                    <th>현원</th>
                                    <td>39인 / 39인 (대기 : 20인)</td>
                                </tr>
                                <tr>
                                    <th>인력현황</th>
                                    <td>39인 / 39인 (대기 : 20인)</td>
                                </tr>
                                <tr>
                                    <th>교통편</th>
                                    <td>지하철 3호선 2번 출구</td>
                                </tr>
                                <tr>
                                    <th>주차시설</th>
                                    <td>29대 (자주 12 / 기계 2)</td>
                                </tr>
                                <tr>
                                    <th>평가</th>
                                    <td>A급(2019년 평가)</td>
                                </tr>
                                <tr>
                                    <th>최근거래</th>
                                    <td>20억(등가사항 전부증명)</td>
                                </tr>
                            </Table>
                        </Section>
                        <Section>
                            <h3>환경정보</h3>
                            <hr />
                            <Envs>
                                <Env className="nursing">병/위원 근접</Env>
                                <Env className="cluster">주택 밀집 지역</Env>
                                <Env className="newTown">신도시</Env>
                                <Env className="rising">지가 상승<br/>거래 지역</Env>
                                <Env className="traffic">역세권</Env>
                                <Env className="market">중심상권</Env>
                                <Env className="road">대로변</Env>
                            </Envs>
                        </Section>
                        <Section>
                            <h3>상세 설명</h3>
                            <hr />
                            <Description>
                                서초역과 인접해 있는 신도시 인근 최고의 위치. 39인 주야간 보호센터로 운영 중
                            </Description>
                        </Section>
                        <Section>
                            <h3>시장현황</h3>
                        </Section>
                        <Section>
                            <h3>보노지수</h3>
                        </Section>
                    </TabCont>
                    <TabCont active={tabIdx === 1}>
                        <Section>
                            <h3>◈ 토지 정보</h3>
                            <div>
                                <Table>
                                    <tr>
                                        <th>면적</th>
                                        <td>평 or m² 단위로 전환가능</td>
                                    </tr>
                                    <tr>
                                        <th>지목</th>
                                        <td>대</td>
                                    </tr>
                                    <tr>
                                        <th>용도지역</th>
                                        <td>계획 관리지역</td>
                                    </tr>
                                    <tr>
                                        <th>이용상황</th>
                                        <td>상업용</td>
                                    </tr>
                                    <tr>
                                        <th>소유구분</th>
                                        <td>개인 or 법인</td>
                                    </tr>
                                    <tr>
                                        <th>공시지가(m²)</th>
                                        <td>500,000원</td>
                                    </tr>
                                </Table>
                            </div>
                        </Section>
                        <Section>
                            <h3>◈ 건물 정보</h3>
                            <div>
                                <Table>
                                    <tr>
                                        <th>주용도</th>
                                        <td>노유자시설</td>
                                    </tr>
                                    <tr>
                                        <th>신축년도</th>
                                        <td>2010년</td>
                                    </tr>
                                    <tr>
                                        <th>건폐율</th>
                                        <td>59.1%</td>
                                    </tr>
                                    <tr>
                                        <th>용적률</th>
                                        <td>255.8%</td>
                                    </tr>
                                    <tr>
                                        <th>건축물 연면적</th>
                                        <td>m² or 평</td>
                                    </tr>
                                    <tr>
                                        <th>3층 면적</th>
                                        <td>m² or 평</td>
                                    </tr>
                                    <tr>
                                        <th>규모</th>
                                        <td>지하 1층 / 지상 4층</td>
                                    </tr>
                                    <tr>
                                        <th>주차대수</th>
                                        <td>자주 12대 / 기계 2대</td>
                                    </tr>
                                    <tr>
                                        <th>승강기</th>
                                        <td>유</td>
                                    </tr>
                                </Table>
                            </div>
                        </Section>
                    </TabCont>
                </div>
            </Contents>
            <Contact>문의하기</Contact>
        </Center>
    )
};

export default CenterItem;
