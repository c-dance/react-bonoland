import { Header, HomeLink, Menu, NavMenu, Nav, UtilMenu, Calculate, Hello, Button } from './GlobalHeaderStyle';
import { Link } from 'react-router-dom';

const GlobalHeader = ({
    onCalcClick,
    onSignUpClick
}) => {
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
                            <Link to="/contact">매물문의</Link>
                        </Nav>
                        <Nav>
                            <Link to="/news">뉴스</Link>
                        </Nav>
                    </NavMenu>
                    <UtilMenu>
                        <Button>로그인</Button>
                        <Button 
                            className="highlight"
                            onClick={ () => onSignUpClick() }
                        >회원가입</Button>
                        {/* <Hello>안녕하세요, 홍길동 님!</Hello> */}
                        <Calculate
                            onClick={ () => onCalcClick() }
                        >수익계산기</Calculate>
                    </UtilMenu>
            </Menu>
        </Header>
    )
}

export default GlobalHeader;