import { List, Card, Post } from './NewsListStyle';
import NewsCard from '../NewsCard/NewsCard';
import React from "react";
import { Loading, NoData, Error } from '../../ui/Inform/Inform';


const NewsList = ({ 
    news, 
    loading, 
    error,
    onCardClick
 }) => {
    return (
        <List>
            <div>
                { loading && Loading() }
                { error && Error() }
                {   news && news.length > 0 &&
                    news.map((post, idx) => (
                        <div key={ idx }>
                            <Card onClick={ () => onCardClick(post["newsNo"]) }>
                                <Post>
                                    <h3>{ post.newsTitle }</h3>
                                    { post.newsFile && <img src={ post.newsFile }/> }
                                    <p>{ post.newsContent }</p>
                                </Post>
                            </Card>
                            { idx < (post.length) && <hr />}
                        </div>
                    ))
                }
            </div>
        </List>
    )
};

export default NewsList;