
import GlobalHeader from '../../components/global/GlobalHeader/GlobalHeader';
import MobileTabBar from '../../components/global/MobileTabBar/MobileTabBar';
import QuickMenu from '../../components/global/QuickMenu/QuickMenu';

const LayoutContainer = ({ children }) => {

    // 로그인 인증 > props

    return(
        <>
            <GlobalHeader />
            <MobileTabBar />
            <QuickMenu />
            { children }
        </>
    )
}

export default LayoutContainer;