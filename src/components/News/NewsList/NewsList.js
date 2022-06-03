import { List, Card } from './NewsListStyle';
import NewsCard from '../NewsCard/NewsCard';
import React from "react";

const NewsList = ({ datas }) => {
    return (
        <List>
            <div>
                {
                    datas.map((data, idx) => (
                        <div key={ idx }>
                            <NewsCard data={ data } type="list" ></NewsCard>
                            { idx < (datas.length) && <hr />}
                        </div>
                    ))
                }
            </div>
        </List>
    )
};

export default NewsList;