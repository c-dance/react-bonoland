import styled from 'styled-components';
import { module } from '../../../themes/module';

export const Form = styled(module.AccountForm)`
    height: 270px;
`;

export const TypeBoxes = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    > div {
        position: relative;
        width: 136px;
        height: 136px;
        border-radius: 2px;
        overflow: hidden;

        input {
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            heigth: 0;
        }

        label {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            border-radius: 2px;
            border: 1px solid ${({theme}) => theme.colors.gray400 };
            font-size: 24px;
            color: ${({theme}) => theme.colors.gray600 };
        }

        input:checked + label {
            border-color: ${({theme}) => theme.colors.primary };
        }
    }

    &.mobile {
        flex-direction: column;
        gap: 20px;

        > div {
            width: 100%;
            height: 126px;

            label {
                font-size: 24px;
            }
        }
    }
`;
