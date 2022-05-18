import { Card } from './NewsCardStyle';
import { Link } from 'react-router-dom';

const NewsCard = ({ data }) => {
    return (
        <Card>
            <Link to="/news/asd">
                <h3>{ data.title }</h3>
                { data.file && <img /> }
                <p>{ data.abstract || data.contents }</p>
            </Link>
        </Card>
    )
};

export default NewsCard;