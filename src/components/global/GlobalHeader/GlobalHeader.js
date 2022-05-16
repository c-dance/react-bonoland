import { Header, HomeLink, Menu, NavMenu, Nav, UtilMenu, Calculate } from './GlobalHeaderStyle';
import { Link } from 'react-router-dom';

const GlobalHeader = () => {
    return (
        <Header>
            <HomeLink to="/" />
            <Menu>
                <NavMenu>
                    <Nav theme="accent">
                        <Link to="/sales">시설매매</Link>
                    </Nav>
                    <Nav theme="accent">
                        <Link to="/recommend">추천매물</Link>
                    </Nav>
                    <Nav>
                        <Link to="/register">매물접수</Link>
                    </Nav>
                    <Nav>
                        <Link to="/contact">매물문의</Link>
                    </Nav>
                    <Nav>
                        <Link to="/news">매물문의</Link>
                    </Nav>
                </NavMenu>
                <UtilMenu>
                    <button className='btn'>로그인</button>
                    <button className='btn signup-btn'>회원가입</button>
                </UtilMenu>
                <Calculate>수익계산기</Calculate>
            </Menu>
        </Header>
    )
}

export default GlobalHeader;