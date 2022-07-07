import styled from 'styled-components';
import { Link } from 'react-router-dom';
import scrapIcon from '../../../assets/images/icon/ico-star.svg';
import shareIcon from '../../../assets/images/icon/ico-share.svg';

export const Card = styled.article`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px 0;

    &.abstract { padding: 8px 0; }
`;

export const Head = styled.h3`
    padding-bottom: 16px;
    border-bottom: 2px solid ${ ({theme}) => theme.colors.gray800 };
    color: ${ ({theme}) => theme.colors.gray900 };
    font-weight: ${ ({theme}) => theme.fontWeights.medium };
`;

export const Wrap = styled(Link)`
    position: relative;
    display: flex;
    gap: 16px;
    height: 184px;
    overflow: hidden;
    .abstract & { height: auto; }
    .sub & { height: 156px; }
`;

export const Thumbnail = styled.div`
    width: 148px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    overflow: hidden;
`;

export const Sales = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%
`;

export const Cate = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    padding: 8px 16px;
    color: #fff;
    background-color: rgba(0, 31, 96, 0.6);
`;

export const Corp = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: end;
    align-items: center;
    width: 100%;
    max-width: 64px;
    height: 26px;
    gap: 4px;
    overflow: hidden;
    img {
        height: 100%;
    }
`;

export const Num = styled.div`
    margin-bottom: 8px;

    .abstract & { 
        position: absolute;
        top: 0;
        right: 0;
    }

    span {
        display: inline-block;
        width: auto;
        padding: 6px 8px;
        border: 1px solid ${ props => props.theme.colors.gray300 };
        border-radius: 2px;
        font-size: ${ ({theme}) => theme.fontSizes.xs };
        color: ${ ({theme}) => theme.colors.gray600 };

        .abstract & {
            padding: 4px 8px;
            font-size: ${ ({theme}) => theme.fontSizes.xxs };
        }
    }
`;

export const Badges = styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 12px;

    div {
        padding: 4px 8px;
        font-size: ${ ({theme}) => theme.fontSizes.xxs };
        color: #fff;
        border-radius: 2px;
        &.recommend { background-color: #E91E63; }
        &.premium { background-color: #4CAF50; }
    }
`;

export const Name = styled.div`
    margin-bottom: 6px;
    font-weight: ${ ({theme}) => theme.fontWeights.bold };
`;

export const Region = styled.div`
    margin-bottom: 8px;
    font-size: ${ ({theme}) => theme.fontSizes.s };
    color: ${ ({theme}) => theme.colors.gray800 };

    .abstract & {
        font-size: 13px;
        color: ${ ({theme}) => theme.colors.gray700 };
    }
`;

export const Price = styled.div`
    margin-bottom: 12px;
    font-size: ${ ({theme}) => theme.fontSizes.l };
    font-weight: ${ ({theme}) => theme.fontWeights.medium };

    .abstract & {
        margin-bottom: 8px;
        font-size: 13px;
        color: ${ ({theme}) => theme.colors.blue };
    }
`;

export const Infos = styled.div`
    display: flex;
    flex-direction: column;
    font-size: ${ ({theme}) => theme.fontSizes.xs };
    color: ${ ({theme}) => theme.colors.gray700 };
    line-height: 1.2;
    margin-bottom: 16px;

    .abstract & { 
        gap: 4px;
        margin-bottom: 0; 
    }
`;

export const Assets = styled.div`
    display: flex;

    div {
        flex: 1;
        display: flex;
        justify-content: start;
        align-items: center;
        gap: 8px;

        em {
            padding: 4px 8px;
            font-size: ${ ({theme}) => theme.fontSizes.xs };
            border-radius: 2px;
            color: #fff;
            &.invest { background-color: #D15F2E; }
            &.loan { background-color: #D19A2E; }
        }

        span {
            font-size: ${ ({theme}) => theme.fontSizes.s };
        }
    }
`;