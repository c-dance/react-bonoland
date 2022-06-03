import { Card } from './NewsCardStyle';
import { Link } from 'react-router-dom';
import React from "react";

const NewsCard = ({ data, type }) => {

    const CONTENTS = () => (
        <div>
            <h3>{ data.title }</h3>
            { data.file && <img /> }
            <p>{ data.abstract || data.contents }</p>
        </div>
    );

    return (
        <>
            {
                type === "list" &&
                <Card>
                    <Link to={`/news/${data.id}`}>
                        { CONTENTS() }
                    </Link>
                </Card>
            }
            {
                type !== "list" && 
                <Card className="wrapper">
                    { CONTENTS() }
                </Card>
            }
        </>
    )
};

export default NewsCard;