import styled from 'styled-components';

export const Card = styled.article`
    padding: 24px 16px;
    height: 100%;

    h3 {
        margin-bottom: 16px;
        font-size: ${({ theme }) => theme.fontSizes.l };
        line-height: 1.5;
    }

    p{
        color: ${({ theme }) => theme.colors.gray600 };
        line-height: 1.625;
        max-height: 104px;
        ${'' /* height: 104px; */}
        text-overflow: ellipsis;
    }

    &.wrapper {
        height: calc(100% - 56px);
        overflow-y: auto;
    }
`;