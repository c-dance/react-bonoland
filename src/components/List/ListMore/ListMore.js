import { MoreLink, Wrap } from './ListMoreStyle';
import React from "react";

const More = ({ links }) => (
    <Wrap>
        {
            links.map(link => (
                <MoreLink 
                    key={ link.title } 
                    to={ link.path }
                >
                    <span>{ link.title }</span>
                </MoreLink>
            ))
        }
    </Wrap>
)

export default More;