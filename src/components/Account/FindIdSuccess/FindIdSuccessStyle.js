import styled from 'styled-components';
import { module } from '../../../themes/module';

export const Form = styled(module.AccountForm)`
    height: 330px;
`;

export const FindId = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    width: 100%;
    padding: 50px 0;
    border-radius: 2px;
    border: 1px solid ${({theme}) => theme.colors.gray300};
    color: ${({theme}) => theme.colors.gray800};

    strong {
        font-size: 22px;
        font-weight: ${({theme}) => theme.fontWeights.medium};
    }
`;