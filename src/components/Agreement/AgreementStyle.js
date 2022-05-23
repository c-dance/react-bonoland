import styled from 'styled-components';
import { module } from '../../theme';

export const AgreementBox = styled.div`
    h3 {
        font-size: ${({theme}) => theme.fontSizes.l };
        font-weight: ${({theme}) => theme.fontWeights.medium };
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 56px;

    fieldset {
        display: flex;
        gap: 8px;
    }

    button {
        width: 160px;
        height: 52px;
        margin: 0 auto;
    }
`;


export const Terms = styled(module.scrollWrapper)`
    width: 100%;
    height: 100px;
    margin: 16px 0 12px;
    padding: 12px;
    font-size: 14px;
    border: 1px solid ${({theme}) => theme.colors.gray300 };
    color: ${({ theme }) => theme.colors.gray600 }
`;