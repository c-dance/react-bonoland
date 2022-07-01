import React from "react";
import { Header, HomeLink, Menu, NavMenu, Nav, UtilMenu, Calculate, Hello, Button } from './GlobalHeaderStyle';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { 
    activateSignup,
    activateLogin,
    activateCalculator,
    activateContact
} from '../../../store/actions/mode';
import { useSelector } from "react-redux";

const GlobalHeader = () => {

    const dispatch = useDispatch();
    const LOGGEDIN = useSelector(state => state.User.loggedIn);
    const USER_NAME = useSelector(state => state.User.userInfo.name);

    const currentPath = useLocation().pathname;
    const navigate = useNavigate();

    const onHomeClick = () => {
        currentPath === '/'? window.location.reload() : navigate('/');
    };
    
    return (
        <Header>
            <HomeLink onClick={ () => onHomeClick() } />
            <Menu>
                <NavMenu>
                    <Nav>
                        <Link to="/register">매물접수</Link>
                    </Nav>
                    <Nav>
                        <button onClick={() => dispatch(activateContact())}>매수문의</button>
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