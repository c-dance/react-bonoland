import { Card } from './NewsCardStyle';
import { Link } from 'react-router-dom';
import React from "react";
import { Loading, NoData, Error } from '../../ui/Inform/Inform';

const NewsCard = ({ 
    news, 
    type,
    loading,
    error,
    noData
}) => {

    const CONTENTS = (news) => (
        <div>
            <h3>{ news.newsTitle }</h3>
            { news.newsFileName && <img /> }
            <p>{ news.newsContent }</p>
        </div>
    );

    return (
        <>
            { loading && Loading() }
            { error && Error() }
            { noData && NoData() }
            {
                type === "list" && news &&
                <Card>
                    <Link to={`/news/${news["newsNo"]}`}>
                        { CONTENTS(news) }
                    </Link>
                </Card>
            }
            {
                type !== "list" && news &&
                <Card className="wrapper">
                    { CONTENTS(news) }
                </Card>
            }
        </>
    )
};

export default NewsCard;