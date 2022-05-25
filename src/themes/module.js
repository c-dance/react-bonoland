import styled from 'styled-components';
import { theme } from './theme';

const scrollWrapper = styled.div`
    overflow-x: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-track {
        width: 8px;
        background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
        width: 8px;
        border: 2px solid white;
        border-radius: 6px;
        background-color: #bdbdbd;
    }

    > * {
        height: auto;
    }
`;

const Button = styled.button`
    width: 100%;
    border-radius: 2px;
    text-align: center;
`;

const Input = styled.input`
    width: 100%;
    height: 44px;
    padding: ${ props => props.border? '0 16px' : '0 8px' };
    border: 1px solid #E0E0E0;
    border-width: ${ props => props.border? '1px 1px 1px' : '0 0 2px' };
    font-size: ${ props => props.border? '14px' : '16px' }; 
    background-color: #fff;

    &:focus,
    &:active {
        border-color: '#BD9369';
    }

    &:placeholder {
        color: ${ props => props.border? '#BDBDBD' : '#757575' }; 
    }

    &.disabled {
        border-width: 0;
    }
`;

const Fieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const SubmitButton = styled(Button)`
    height: 48px;
    line-height: 48px;
    background-color: #BD9369;
    color: #fff;
    margin: 0 auto;

    &.disabled {
        background-color: #f4f4f4;
        color: #BDBDBD;
    }

`;

const TableForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    
    fieldset {
        display: flex;
        flex-direction: column;

        legend {
            margin-bottom: 12px;
            font-size: 18px;
            font-weight: 500;
        }

        table {
            width: 100%;
            border: 1px solid #E0E0E0;
            tr {
                border-bottom: 1px solid #E0E0E0;
                &:last-child { border-bottom: 0; }

                th {
                    height: 37px;
                    background-color: #8B653E;
                    color: #FFF;

                    label {
                        display: flex;
                        height: 100%;
                        justify-content: center;
                        align-items: center;
                    }
                }

                td {
                    height: 100%;
                    vertical-align: center;

                    input, 
                    select {
                        display: block;
                        width: 100%;
                        height: 100%;
                        padding: 0 12px;
                        border: 0;
                    }

                    select {
                        color: #757575;
                    }

                    textarea {
                        display: block;
                        width: 100%;
                        height: 74px;
                        padding: 12px;
                        border: 0;
                        resize: none;
                    }
                }
            }
        }
    }
`;

const MobileForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding-bottom: 52px;

    fieldset {
        display: flex;
        flex-direction: column;
        gap: 32px;

        &.cols {
            flex-wrap: wrap;
            flex-direction: row;
            gap: 32px 20px;

            .wrap {
                flex: inherit;
                justify-content: space-between;
                width: calc(50% - 10px);

                label {
                    font-size: ${theme.fontSizes.s};
                }
            }
        }

        legend {
            display: block;
            width: 100%;
            padding-bottom: 12px;
            margin-bottom: 32px;
            border-bottom: 2px solid ${ theme.colors.primary };
            font-size: ${theme.fontSizes.l};
            font-weight: ${theme.fontWeights.medium};
        }

        .wrap {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        label {
            font-weight: ${theme.fontWeights.medium};
        }

        input, 
        select {
            width: 100%;
            height: 44px;
            padding: 0 8px;
            border-radius: 2px;
            border: 1px solid ${theme.colors.gray200};
        }
        textarea {
            width: 100%;
            height: 160px;
            border-radius: 2px;
            border: 1px solid ${theme.colors.gray200};
            resize: none;
        }
    }

    button {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 52px;
    }
`;

export const AccountForm = styled.form`
    position: relative;
    width: 100%;
    height: 100%;

    .desc {
        margin-bottom: 40px;
        line-height: 1.4;
        font-size: ${ theme.fontSizes.xs };
        color: ${ theme.colors.gray500 };
    }

    fieldset {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    hr {
        display: block;
        width: 100%;
        height: 1px;
        margin: 24px 0;
        border: 0;
        background-color: ${ theme.colors.gray200 };
    }

    .wrap {
        position: relative;
        display: flex;
        flex-direction: column;
        
        label {
            display: block;
            margin-bottom: 12px;
            font-size: 15px;
            font-weight: ${ theme.fontWeights.medium };
        }

        input {
            width: 100%;
            height: 44px;
            border-bottom: 1px solid ${ theme.colors.gray200 };
            padding: 0 16px;
            &:focus { border-color: ${ theme.colors.primary }; }

            &.bd {
                border: 1px solid ${ theme.colors.gray200 };
                border-radius: 2px;
            }
        }

        .warn {
            display: block;
            padding-top: 8px;
            margin-top: -1px;
            border-top: 2px solid ${ theme.colors.red };
            font-size: ${ theme.fontSizes.xs };
            color: ${ theme.colors.red };
        }
    }

    .action {
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 16px;
        width: 100%;

        button {
            width: 100%;
            height: 56px;
            border-radius: 2px;
            text-align: center;
            line-height: 56px;
            background-color: ${ theme.colors.primary };
            color: #fff;
            font-weight: ${ theme.fontWeights.medium };

            &.disabled {
                background-color: ${ theme.colors.gray100 };
                color: ${ theme.colors.gray400 };
            }
        }

        span, a {
            text-decoration: underline;
            font-size: ${ theme.fontSizes.s };
        }
    }
`;

const ModalAction = styled.div`
    display: flex;
    flex-directin: column;
    justify-content: center;
    align-items: center;
    gap: 16px;

    .btn {
        margin-top: 56px;
        width: 100%;
        height: 56px;
        border-radius: 2px;
        text-align: center;
        line-height: 56px;
        background-color: ${ theme.colors.primary };
        color: #fff;
        font-weight: ${ theme.fontWeights.medium };
    }

    .link {
        margin-top: 16px;
        text-decoration: underline;
        font-size: ${ theme.fontSizes.s };
        background-color: transparent;
    }
`;


export const module = {
    scrollWrapper,
    Fieldset,
    Input,
    SubmitButton,
    TableForm,
    MobileForm, 
    AccountForm,
    ModalAction
};