import styled from 'styled-components';
import { module } from '../../../themes/module';
import checkboxDefaultIcon from '../../../assets/images/form/ico-checkbox_default.svg';
import checkboxDefaultIconMb from '../../../assets/images/form/ico-checkbox_default_square.svg';
import checkboxCheckedtIcon from '../../../assets/images/form/ico-checkbox_checked.svg';
import checkboxCheckedtIconMb from '../../../assets/images/form/ico-checkbox_checked.svg';

export const Form = styled(module.AccountForm)`
    fieldset {
        gap: 8px;

        .mobile & {
            gap: 24px;
        }

        .wrap > label {
            display: none;
            .mobile & {
                display: block;
                margin-bottom: 16px;
            }
        }

        .wrap > input {
            border: 1px solid ${({theme}) => theme.colors.gray300 };
            border-radius: 2px;
        }
    }

    .action {
        position: relative;
        .mobile & {
            position: relative;
        }
    }

    .mobile & {
        padding: 40px 24px;
    }
`;

export const Metas = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 13px 0 33px;

    .mobile & {
        margin-top: 20px;
    }

    .store {
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
            padding-left: 22px;
            height: 100%;
            line-height: 14px;
            background: url(${checkboxDefaultIcon}) left center / 14px 14px no-repeat;
            font-size: ${ ({theme}) => theme.fontSizes.s };
            color: ${ ({theme}) => theme.colors.gray600 };
        }

        input:checked + label { 
            background: url(${checkboxCheckedtIcon}) left center / 14px 14px no-repeat; 
        }
    }

    .finds {
        display: flex;
        gap: 15px;

        button {
            position: relative;
            background-color: transparent;
            color: ${ ({theme}) => theme.colors.gray600 };
            font-size: ${ ({theme}) => theme.fontSizes.s };
        }
        button:first-child::after {
            position: absolute;
            top: 3px; 
            right: -8px;
            width: 1px;
            height: 14px;
            content: '';
            background-color: ${ ({theme}) => theme.colors.gray600 };
        }
    }
`;

export const Signup = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 24px;

    .mobile & {
        margin-top: 4px;
    }

    span {
        color: ${ ({theme}) => theme.colors.gray600 };
        font-weight: ${ ({theme}) => theme.fontWeights.medium };
        .mobile & {
            display: none;
        }
    }

    button {
        text-decoration: underline;
        background-color: transparent;
        font-size: 13px;
        font-weight: ${ ({theme}) => theme.fontWeights.medium };

        .mobile & {
            text-decoration: none;
            width: 100%;
            height: 56px;
            line-height: 56px;
            border-radius: 2px;
            border: 1px solid ${ ({theme}) => theme.colors.primary };
            color: ${ ({theme}) => theme.colors.primary };
        }
    }
`;