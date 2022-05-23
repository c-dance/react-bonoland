import styled from 'styled-components';

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

    button {
        width: 160px;
    }
`;