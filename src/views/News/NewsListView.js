import NewsListContainer from '../../containers/News/NewsListContainer';
import MainListContainer from "../../containers/Main/MainListContainer";
import Pannel from '../../components/Pannel/Pannel';

const NewsListView = () => (
    <>
        <Pannel
            type={ "floating" }
            position={ "left" }
            fold={ true }
        >
            <MainListContainer />
        </Pannel>
        <Pannel
            type={ "side" }
            position={ "right" }
            fold={ false }
        >
            <NewsListContainer />
        </Pannel>
    </>
);

export default NewsListView;