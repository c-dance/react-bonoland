import { Header, HomeLink, Menu, NavMenu, Nav, UtilMenu, Calculate, Hello, Button } from './GlobalHeaderStyle';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { 
    activateSignup,
    activateLogin,
    activateCalculator,
} from '../../../store/actions/mode';
import React from "react";

const GlobalHeader = () => {

    const dispatch = useDispatch();

    return (
        <Header>
            <HomeLink to="/" />
            <Menu>
                    <NavMenu>
                        <Nav className="highlight">
                            <Link to="/sales">시설매매</Link>
                        </Nav>
                        <Nav className="highlight">
                            <Link to="/recommend">추천매물</Link>
                        </Nav>
                        <Nav>
                            <Link to="/register">매물접수</Link>
                        </Nav>
                        <Nav>
                            <Link to="/contact">매수문의</Link>
                        </Nav>
                        <Nav>
                            <Link to="/news">뉴스</Link>
                        </Nav>
                    </NavMenu>
                    <UtilMenu>
                        <Button
                            onClick={ () => dispatch(activateLogin()) }
                        >로그인</Button>
                        <Button 
                            className="highlight"
                            onClick={ () => dispatch(activateSignup()) }
                        >회원가입</Button>
                        {/* <Hello>안녕하세요, 홍길동 님!</Hello> */}
                        <Calculate
                            onClick={ () => dispatch(activateCalculator()) }
                        >수익계산기</Calculate>
                    </UtilMenu>
            </Menu>
        </Header>
    )
}

export default GlobalHeader;