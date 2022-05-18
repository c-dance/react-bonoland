import styled from 'styled-components';

export const Menus = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 36px;
    width: 100%;
    height: 100%;
    padding: 60px 24px;

    a {
        font-weight: ${({ theme }) => theme.fontWeights.medium };
    }
`;

export const Logout = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 56px;
    line-height: 56px;
    text-align: center;
    border-top: 1px solid ${({ theme }) => theme.colors.gray200 };
    color: ${({ theme }) => theme.colors.gray500 };
    font-size: ${({ theme }) => theme.fontSizes.s };
    font-weight: ${({ theme }) => theme.fontWeights.medium };
`;