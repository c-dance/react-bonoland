import NewsItemContainer from "../../containers/News/NewsItemContainer";
import MainListContainer from "../../containers/Main/MainListContainer";
import Pannel from "../../components/Pannel/Pannel";

const NewsItemView = () => (
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
            <NewsItemContainer />
        </Pannel>
    </>
);

export default NewsItemView;