import styled from 'styled-components';
import { module } from '../../../themes/module';
import shieldIcon from '../../../assets/images/icon/ico-shield.gif';

export const Form = styled(module.AccountForm)`
    
    height: 150px;

    h3 {
        margin-bottom: 16px;
        font-size: 24px;
        font-weight: ${ ({theme}) => theme.fontWeights.medium };
        text-align: center;
    }

    .mobile & {
        padding-top: 140px;
        background: url(${shieldIcon}) center 40px / 67px 67px no-repeat #fff;
    }
`;