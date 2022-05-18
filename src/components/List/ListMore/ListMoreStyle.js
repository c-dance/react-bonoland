import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MoreLink = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 57px;
    box-shadow: 3px 3px 6px rgba(0,0,0,.06);
    color: ${ ({ theme }) => theme.colors.primary };
`;