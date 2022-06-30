import { Card, Post } from './NewsCardStyle';
import { Link } from 'react-router-dom';
import React from "react";
import { Loading, NoData, Error } from '../../ui/Inform/Inform';

const NewsCard = ({ 
    news, 
    type,
    loading,
    error
}) => {

    const CONTENTS = (news) => (
        <Post>
            <h3>{ news.newsTitle }</h3>
            { news.newsFileName && <img src={ news.newsFile }/> }
            <p>{ news.newsContent }</p>
        </Post>
    );

    return (
        <>
            { loading && Loading() }
            { error && Error() }
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