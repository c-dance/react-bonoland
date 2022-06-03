import { MoreLink } from './ListMoreStyle';
import React from "react";

const More = ({ path, text }) => (
    <MoreLink to={ path }>
        <span>{ text }</span>
    </MoreLink>
)

export default More;