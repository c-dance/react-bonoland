import { Card, Post } from './NewsCardStyle';
import React from "react";
import { Loading, NoData, Error } from '../../ui/Inform/Inform';

const NewsCard = ({ 
    news, 
    loading,
    error
}) => {

    return (
        <>
            { loading && Loading() }
            { error && Error() }
            {
                news &&
                <Card className="wrapper">
                    <Post>
                        <h3>{ news.newsTitle }</h3>
                        { news.newsFile && <img src={ news.newsFile }/> }
                        <p>{ news.newsContent }</p>
                    </Post>
                </Card>
            }
        </>
    )
};

export default NewsCard;