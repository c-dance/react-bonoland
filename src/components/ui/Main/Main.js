import { isMobile } from "react-device-detect"
import { isBrowser } from "react-device-detect";
import styled from "styled-components";

const MainWrapper = styled.main`
    z-index: 20;
    position: relative;
    width: 100%;
    height: 100%;
    min-width: ${ isBrowser? "1240px" : "100%" };
`;

const Main = ({ children }) => {
    return (
        <MainWrapper>
            { children }
        </MainWrapper>
    )
};

export default Main;