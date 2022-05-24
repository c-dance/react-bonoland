import { Footer, Infos, Copyright } from './GlobalFooterStyle';

const GlobalFooter = () => {
    return (
        <Footer>    
            <Infos>
                <li>
                    <span>회사명 : (주)보노랜드</span>
                </li>
                <li>
                    <span>대표자 : 한민우</span>
                    <span>사업자등록번호 : 263-87-02541</span>
                    <span>대표전화 : 032-321-1008</span>
                </li>
                <li>
                    <span>주소 : 경기도 부천시 길주로 275 중동프라자 306호</span>
                    <span>이메일 : bonoland01@gmail.com</span>
                </li>
            </Infos>
            <Copyright>
                <span>
                    Copyright 2022 보노랜드. All rights reserved.
                </span>
                <p>
                    ※ 당사 홈페이지는 사전 승낙없이 무단복제 및 전송 등의 행위를 금지합니다. 위반시 저작권법·콘텐츠산업진흥법에 따라 법률적 책임이 따를 수 있습니다.
                </p>
            </Copyright>
        </Footer>
    )
};

export default GlobalFooter;