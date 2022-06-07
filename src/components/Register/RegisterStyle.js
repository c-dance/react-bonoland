import styled from 'styled-components';
import { module } from '../../themes/module';

export const RegisterWrap = styled(module.scrollWrapper)`
    height: 100%;
    max-height: 600px;
    .mobile & {
        height: calc(100% - 112px);
        max-height: calc(100% - 112px);
    }
`;

export const Inform = styled.div`

    .inform {
        margin-top: 32px;
        padding: 24px 32px;
        background-color: #8B653E;
        color: #fff;

        strong {
            font-weight: ${ ({theme}) => theme.fontWeights.bold };
        }

        p {
            margin-top: 16px;
            font-size: ${ ({theme}) => theme.fontSizes.s };
            line-height: 1.5;
        }

        .mobile & {
            padding: 16px 24px;
        }
    }

    .agree {
        display: flex;
        gap: 8px;
        margin-top: 32px;

        input {

        }

        label {

        }
    }

    .policy {
        margin-top: 8px;
        padding: 24px 32px;
        border: 1px solid ${ ({theme}) => theme.colors.gray200 };
        border-radius: 2px;
        font-size: ${ ({theme}) => theme.fontSizes.s };
        color:  ${ ({theme}) => theme.colors.gray800 };
        line-height: 1.5;

        .mobile & {
            padding: 16px 24px;
        }
    }
`;