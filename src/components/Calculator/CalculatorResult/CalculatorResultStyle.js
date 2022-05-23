import styled from 'styled-components';

export const CalcForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 100%;

    table {
        width: 100%;
        border: 1px solid ${({theme}) => theme.colors.gray300 };

        th, 
        td {
            height: 36px;
            vertical-align: middle;
            text-align: center;
            border-right: 1px solid ${({theme}) => theme.colors.gray300 };
        }

        thead {
            background-color: ${({theme}) => theme.colors.gray300 };
        }

        tbody {
            tr {
                border-top: 1px solid ${({theme}) => theme.colors.gray300 };

                &.total {
                    background-color: #FDE2E4;
                    font-weight: ${({theme}) => theme.fontWeights.bold};

                    td:first-child { 
                        background-color: ${({theme}) => theme.colors.gray200 }; 
                    }
                }
                &.cost {
                    background-color: #DFE7FD;
                    font-weight: ${({theme}) => theme.fontWeights.bold};
                    
                    td:first-child { 
                        background-color: ${({theme}) => theme.colors.gray200 }; 
                    }
                }
                td {
                }
            }
        }
        tfoot {
            background-color: ${({theme}) => theme.colors.gray300 };
            
            td {
                height: 36px;
                font-weight: ${({theme}) => theme.fontWeights.bold};
                color: #DD2C00;
            }
        }
    }

    button {
        width: 160px;
    }
`;