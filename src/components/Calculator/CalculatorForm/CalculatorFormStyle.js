import styled from 'styled-components';
import { module } from '../../../themes/module';
import { isBrowser } from 'react-device-detect';

export const Wrapper = styled(module.scrollWrapper)`
    height: auto;
    max-height: calc(100vh - 200px);

    &.calced { 
        height: 600px;
        .mobile & {
            height: 100%;
            max-height: calc(100% - 56px);
        }
    }

    > div {
        display: flex;
        flex-direction: column;
        gap: 56px;
        padding-bottom: 40px;

        .mobile & {
            gap: 0;
            padding-bottom: 0;
        }
    }

`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 56px;
    width: 100%;

    fieldset {
        width: 100%;

        legend {
            margin-bottom: 16px;
            font-size: ${({theme}) => theme.fontSizes.l };
            font-weight: ${({theme}) => theme.fontWeights.bold };
        }

        table {
            border: 1px solid ${({theme}) => theme.colors.gray300 };

            thead {
                border-bottom : 1px solid ${({theme}) => theme.colors.gray300 };
                th {
                    height: 36px;
                    border-right: 1px solid ${({theme}) => theme.colors.gray300 }; 
                    label {
                        display: block;
                        line-height: 36px;
                        background-color: ${({theme}) => theme.colors.gray200 }; 
                    }
                }
            }

            tbody {
                td {
                    height: 36px;
                    border-right: 1px solid ${({theme}) => theme.colors.gray300 };

                    input,
                    select {
                        display: block;
                        width: 100%;
                        height: 100%;
                        padding: 12px;
                        border: 0;
                        text-align: center;
                        font-size: ${({theme}) => theme.fontSizes.base };
                    } 
                }
            }
        }
    }

    .actions {
        display: flex;
        gap: 16px;
        justify-content: center;
        align-items: center;

        button {
            width: 160px;
            height: 52px;
            line-height: 52px;
            border: 1px solid ${ ({theme}) => theme.colors.primary };
            background-color: #fff;
            color: ${ ({theme}) => theme.colors.primary };

            &[type="submit"] {
                background-color: ${ ({theme}) => theme.colors.primary };
                color: #fff;
            }
        }
    }

`;