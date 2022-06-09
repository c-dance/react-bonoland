import styled from 'styled-components';
import { module } from '../../../themes/module';
import checkDefaultIcon from '../../../assets/images/form/ico-checkbox02_default.svg'
import checkCheckedIcon from '../../../assets/images/form/ico-checkbox02_checked.svg'

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

        display: flex;
        gap: 8px;
        justify-content: start;
        align-items: center;

        &:first-child {
            margin-bottom: 6px;
        }

        > div {
            position: relative;
            width: 18px;
            height: 18px;
            border-radius: 10px;

            input {
                position: absolute;
                top: 0;
                left: 0;
                width: 0;
                heigth: 0;
            }  

            label {
                display: block;
                width: 100%;
                height: 100%;
                background: url(${checkDefaultIcon}) center no-repeat;
            }

            input:checked + label {
                background: url(${checkCheckedIcon}) center no-repeat;
            }
        }

        span {
            font-weight: ${({theme}) => theme.fontWeights.medium };
        }

        a {
            text-decoration: underline;
            color: ${({theme}) => theme.colors.gray600 };
            font-size: ${({theme}) => theme.fontSizes.s };
        }

    }
    .warn {
        color: ${({theme}) => theme.colors.red };
        font-size: ${({theme}) => theme.fontSizes.s };
    }
`;