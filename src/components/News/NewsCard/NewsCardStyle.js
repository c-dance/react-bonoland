import styled from 'styled-components';

export const Card = styled.div`
    padding: 24px 16px;
    height: 100%;

    &.wrapper {
        height: calc(100% - 56px);
        overflow-y: auto;
    }
`;

export const Post = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    text-align: left;
    
    h3 {
        width: 100%;
        font-size: ${({ theme }) => theme.fontSizes.l };
        line-height: 1.5;
    }
    p{
        width: 100%;
        color: ${({ theme }) => theme.colors.gray600 };
        line-height: 1.625;
        max-height: 104px;
        ${'' /* height: 104px; */}
        text-overflow: ellipsis;
    }
    img {
        max-width: 100%;
    }
`;