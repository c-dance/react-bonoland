import styled from 'styled-components';
import searchIcon from '../../../assets/images/icon/ico-search.svg'

export const KeywordForm = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;
    width: 390px;
    height: 56px;
    padding: 0 24px;
    box-shadow: 3px 0 6px rgba(0,0,0,.06);

    input {
        display: block;
        flex: 1;
    }

    button {
        width: 28px;
        height: 28px;
        font-size: 0;
        background: url(${ searchIcon }) center no-repeat;
    }
`;
