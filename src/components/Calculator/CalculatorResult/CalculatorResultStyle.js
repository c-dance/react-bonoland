import styled from 'styled-components';
import { module } from '../../../themes/module';
import resetIcon from '../../../assets/images/form/ico-reset_white.svg';

export const CalcWrap = styled(module.scrollWrapper)`
    height: 100%;
    max-height: 600px;
    
    .mobile & {
        height: calc(100% - 112px);
        max-height: calc(100% - 112px);
    }
`;

export const Caption = styled.div`
    display: block;
    padding: 12px 0;
    border-bottom: 2px solid ${ ({theme}) => theme.colors.primary };
    font-size: ${ ({theme}) => theme.fontSizes.l };
    font-weight: ${ ({theme}) => theme.fontWeights.medium };
`;

export const CalcHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 12px;
    border-bottom: 2px solid ${({theme}) => theme.colors.primary };
    color: ${({theme}) => theme.colors.gray900 };
    
    .title { 
        font-size: ${({theme}) => theme.fontSizes.l };
        font-weight: ${({theme}) => theme.fontWeights.medium };
    }
`;

export const CalcForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    ${'' /* height: auto; */}

    .mobile & {
        gap: 24px;
    }

    table {
        width: 100%;
        border: 1px solid ${({theme}) => theme.colors.gray300 };
        color: ${({theme}) => theme.colors.gray900 };

        th, 
        td {
            height: 36px;
            vertical-align: middle;
            text-align: center;
            border-right: 1px solid ${({theme}) => theme.colors.gray300 };
            padding: 4px;

            &.memo {
                padding-left: 6px;
                text-align: left;
                font-size: ${({theme}) => theme.fontSizes.xs};
            }

            .mobile & {
                height: 40px;
                font-size: ${ ({theme}) => theme.fontSizes.s };
                word-break: keep-all;
            }
        }

        thead {
            background-color: ${({theme}) => theme.colors.gray300 };
            .mobile & { background-color: #fff; }
        }

        tbody {
            tr {
                border-top: 1px solid ${({theme}) => theme.colors.gray300 };

                &.total {
                    background-color: #FDE2E4;
                    font-weight: ${({theme}) => theme.fontWeights.bold};
                    .mobile & { 
                        background-color: #fff; 
                        font-weight: ${({theme}) => theme.fontWeights.regular};
                    }

                    td:first-child { 
                        background-color: ${({theme}) => theme.colors.gray200 }; 
                        .mobile & { background-color: #fff; }
                    }

                    td {
                        .mobile & { color: #DD2C00; }
                    }
                }

                &.cost {
                    background-color: #DFE7FD;
                    font-weight: ${({theme}) => theme.fontWeights.bold};

                    .mobile & { 
                        background-color: #fff;
                        font-weight: ${({theme}) => theme.fontWeights.regular}; 
                    }
                    
                    td:first-child { 
                        background-color: #DFE7FD; 
                        .mobile & { 
                            background-color: #fff; 
                            color: #0091EA;
                        }
                    }

                    td {
                        .mobile & { color: #DFE7FD; }
                        .mobile & { color: #0091EA; }
                    }
                }
            }
        }
        tfoot {
            background-color: ${({theme}) => theme.colors.gray300 };
            .mobile & { 
                background-color: #F1F1FA; 
                border-top: 1px solid ${({theme}) => theme.colors.gray300 };
            }
            
            td {
                height: 36px;
                font-weight: ${({theme}) => theme.fontWeights.bold};
                color: #DD2C00;

                .mobile & { 
                    height: 40px; 
                    border-right: 0;
                    color: ${({theme}) => theme.colors.gray900 };
                    font-weight: ${({theme}) => theme.fontWeights.regular};

                    &:last-child { 
                        text-align: right;
                        font-weight: ${({theme}) => theme.fontWeights.m};
                        padding-right: 16px;
                    }
                }
            }
        }
    }

    button {
        positon: relative;
        width: 160px;
        height: 52px;
        margin: 0 auto;
        line-height: 52px;
        background-color: ${({theme}) => theme.colors.primary };
        color: #fff;
        text-align: center;
        border-radius: 2px;

        &::after {
            display: inline-block;
            width: 18px;
            height: 18px;
            content: '';
            margin-left: 6px;
            transform: translateY(4px);
            background: url(${resetIcon}) center no-repeat;
        }

        .mobile & {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            border-radius: 0;
        }
    }
`;
