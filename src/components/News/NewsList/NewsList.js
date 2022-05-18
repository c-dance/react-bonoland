import { List, Card } from './NewsListStyle';
import NewsCard from '../NewsCard/NewsCard';
import { Link } from 'react-router-dom';

const NewsList = ({ newsList }) => {
    console.log(newsList);
    return (
        <List>
            <div>
                {
                    newsList.map((news, idx) => (
                        <div key={ idx }>
                            <NewsCard data={ news } ></NewsCard>
                            { idx < (newsList.length-1) && <hr />}
                        </div>
                    ))
                }
            </div>
        </List>
    )
};

export default NewsList;