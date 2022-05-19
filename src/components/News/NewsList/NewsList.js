import { List, Card } from './NewsListStyle';
import NewsCard from '../NewsCard/NewsCard';

const NewsList = ({ datas }) => {
    return (
        <List>
            <div>
                {
                    datas.map((data, idx) => (
                        <div key={ idx }>
                            <NewsCard data={ data } ></NewsCard>
                            { idx < (datas.length-1) && <hr />}
                        </div>
                    ))
                }
            </div>
        </List>
    )
};

export default NewsList;