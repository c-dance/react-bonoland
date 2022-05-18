import { MoreLink } from './ListMoreStyle';

const More = ({ path, text }) => (
    <MoreLink to={ path }>
        <span>{ text }</span>
    </MoreLink>
)

export default More;