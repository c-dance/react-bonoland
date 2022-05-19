import CenterList from '../../components/Center/CenterList/CenterList';
import Section from "../../components/ui/Section/Section";
import { useFetch } from '../../hooks/form';
import { Loading, NoResult, Fail } from '../../components/ui/Inform/Inform';

const UserScrapContainer = () => {

    const [ page, scraps ] = useFetch([], '/data/centers.json');

    return (
        <Section
            title={ `찜 매물(${scraps.length})` }
            themeColor={ "primary" }
            close={ true }
            action={ false }
        >
            { page === 'loading' && <Loading /> }
            { page === 'fail' && <Fail /> }
            { page === 'empty' && <NoResult text="찜 매물이 없습니다." /> }
            { page === 'success' && 
                <CenterList 
                    type={ "sub" } 
                    centers={ scraps }
                />
            }
        </Section>
    )
}

export default UserScrapContainer;