import styled from 'styled-components';
import { module } from '../../../themes/module';
import shieldIcon from '../../../assets/images/icon/ico-shield.gif';

export const Success = styled(module.AccountForm)`
    display: flex;
    flex-direction: column;
    gap: 16px;
    text-align: center;
    padding: 40px 24px;

    h3 {
        font-size: 24px;
    }

    p {
        font-size: ${ ({theme}) => theme.fontSizes.s };
        color: ${ ({theme}) => theme.colors.gray600 };
    }

    .mobile & {
        padding-top: 140px;
        background: url(${shieldIcon}) center 40px / 67px 67px no-repeat #fff;
    }
`;