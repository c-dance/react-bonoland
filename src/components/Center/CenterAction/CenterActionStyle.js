import styled from 'styled-components';
import scrapIcon from '../../../assets/images/icon/ico-star.svg';
import scrapActiveIcon from '../../../assets/images/icon/ico-star_brown.svg';
import shareIcon from '../../../assets/images/icon/ico-share.svg';

export const Actions = styled.div`
    display: flex;
    gap: 12px;

    textarea {
        width: 0;
        height: 0;
        font-size: 0;
        position: absolute;
    }
`;

export const Action = styled.button`
    flex: 1;
    height: 40px;
    border: 1px solid ${ props => props.theme.colors.gray300 };
    border-radius: 2px;
    font-size: 0;

    &.scrap {
        background: url(${scrapIcon}) center no-repeat #fff;
        &.on { background: url(${scrapActiveIcon}) center no-repeat #fff; }
    }

    &.share {
        background: url(${shareIcon}) center no-repeat #fff;
    }
`;