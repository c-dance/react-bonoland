import { Main } from './GlobalMainStyle';
import { BrowserView, MobileView } from 'react-device-detect';

const GlobalMain = ({ children }) => {
    return (
        <>
            <BrowserView>
                <Main device="pc">{ children }</Main>
            </BrowserView>
            <MobileView>
                { children }
            </MobileView>
        </>
    )
}

export default GlobalMain;