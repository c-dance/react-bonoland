import React from "react";
import { Header, HomeLink, Menu, NavMenu, Nav, UtilMenu, Calculate, Hello, Button } from './GlobalHeaderStyle';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { 
    activateSignup,
    activateLogin,
    activateCalculator,
} from '../../../store/actions/mode';
import { useSelector } from "react-redux";

const GlobalHeader = () => {

    const dispatch = useDispatch();
    const LOGGEDIN = useSelector(state => state.User.loggedIn);
    const USER_NAME = useSelector(state => state.User.name);
    
    return (
        <Header>
            <HomeLink to="/" />
            <Menu>
                    <NavMenu>
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
                    {
                        LOGGEDIN &&
                        <Hello>안녕하세요, { USER_NAME } 님!</Hello>
                    }
                    {
                        !LOGGEDIN &&
                        <>
                            <Button
                                onClick={ () => dispatch(activateLogin()) }
                            >로그인</Button>
                            <Button 
                                className="highlight"
                                onClick={ () => dispatch(activateSignup()) }
                            >회원가입</Button>

                        </>
                    }
                        <Calculate
                            onClick={ () => dispatch(activateCalculator()) }
                        >수익계산기</Calculate>
                    </UtilMenu>
            </Menu>
        </Header>
    )
}

export default GlobalHeader;