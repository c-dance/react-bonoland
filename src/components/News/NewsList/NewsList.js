import { List } from './NewsListStyle';
import NewsCard from '../NewsCard/NewsCard';
import React from "react";
import { Loading, NoData, Error } from '../../ui/Inform/Inform';


const NewsList = ({ 
    news, 
    loading, 
    error,
    noData,
 }) => {
    return (
        <List>
            <div>
                { loading && Loading() }
                { error && Error() }
                { noData && NoData() }
                {   news && news.length > 0 &&
                    news.map((data, idx) => (
                            <div key={ idx }>
                                <NewsCard 
                                    news={ data } 
                                    type="list" 
                                />
                                { idx < (news.length) && <hr />}
                            </div>
                    ))
                }
            </div>
        </List>
    )
};

export default NewsList;