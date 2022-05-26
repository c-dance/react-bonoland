import CenterList from '../../components/Center/CenterList/CenterList';
import Section from "../../components/ui/Section/Section";
import { useFetch } from '../../hooks';
import { Loading, NoResult, Fail } from '../../components/ui/Inform/Inform';
import { isBrowser, isMobile } from 'react-device-detect';
import ListTab from '../../components/List/ListTab/ListTab';

const UserScrapContainer = () => {

    const [ page, scraps ] = useFetch({}, '/data/scraps.json');

    const centers = scraps["시설"];
    const sales = scraps["매물"];
    const total = 0;

    return (
        <Section
            title={ `찜 매물(${ total })` }
            themeColor={ isBrowser? "primary" : "secondary" }
            close={ isBrowser && true }
            back={ isMobile && true }
            action={ false }
        >
            { page === 'loading' && <Loading /> }
            { page === 'fail' && <Fail /> }
            { page === 'empty' && <NoResult text="찜 매물이 없습니다." /> }
            { page === 'success' && 

                <ListTab 
                    // type={ isBrowser? "full" : "" }
                    navs={["매물", "시설"]} 
                    contents={[
                        <CenterList 
                            type={ "sub" } 
                            centers={ centers } 
                        />,
                        <CenterList 
                            type={ "sub" } 
                            centers={ sales } 
                        />,
                    ]}
                />
            }
        </Section>
    )
}

export default UserScrapContainer;