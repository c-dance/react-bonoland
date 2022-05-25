import styled from 'styled-components';
import { module } from '../../../themes/module';

export const Form = styled(module.AccountForm)`
    fieldset {
        gap: 8px;
    }

    .action {
        position: relative;
    }
`;

export const Metas = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 13px 0 33px;

    .save {
        position: relative;
        width: auto;
        height: 15px;

        input {
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            height: 0;
        }

        label {
            display: block;
            padding-left: 22px
        }
    }

    .finds {

    }
`;

export const SignUp = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
    font-size: 13px;

    span {
        color: ${ ({theme}) => theme.colors.gray600 };
    }
    button {
        text-decoration: underline;
    }
`;