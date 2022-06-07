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
            <h3>{ news["제목"] }</h3>
            { news["file"] && <img /> }
            <p>{ news["내용"] }</p>
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
                    <Link to={`/news/${news["id"]}`}>
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