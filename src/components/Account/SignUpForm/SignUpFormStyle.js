import styled from 'styled-component';
import { module } from '../../../themes/module';

export const Form = styled(module.AccountForm)`
    .action {
        position: relative;
        margin-top: 40px;
    }
`;

export const Agreement = styled.fieldset`
    display: flex;
    flex-direction: column;
    gap: 12px;
    
    > div {
        &:first-child {
            margin-bottom: 6px;
        }

        > div {
            position: relative;
            width: 18px;
            height: 18px;

            input {
                position: absolute;
                top: 0;
                left: 0;
                width: 0;
                heigth: 0;
            }  

            label {

            }
        }

        a {

        }
    }
`;