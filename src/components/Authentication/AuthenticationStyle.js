import styled from 'styled-components';
import { module } from '../../themes/module';

export const Form = styled(module.AccountForm)`
    height: 340px;
`;

export const Time = styled.span`
    position: absolute;
    top: 0;
    right: 0;
    padding: 15px 8px;
    font-size: ${({theme}) => theme.fontSizes.s };
    color: ${({theme}) => theme.colors.blue };
`;

export const Description = styled.div`
    margin: 24px 0 0;
    font-size: ${({theme}) => theme.fontSizes.s };
    text-align: left;
    color: ${({theme}) => theme.colors.gray400 };
`;