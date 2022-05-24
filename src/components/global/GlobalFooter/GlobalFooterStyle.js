import styled from 'styled-components';

export const Footer = styled.footer`
    display: flex;
    flex-direction: column;
    justify-align: center;
    align-items: center;
    gap: 40px;
    padding: 40px 24px 20px;
    border-top: 1px solid ${({theme}) => theme.colors.gray300 };

    @media ${ ({theme}) => theme.device.tablet } {
        gap: 34px;
        padding: 24px;
    }
`;

export const Infos = styled.ul`
    display: flex;
    flex-direction: column;
    justify-align: center;
    align-items: center;
    gap: 8px;


    li {
        display: flex;
        gap: 17px;

        @media ${ ({theme}) => theme.device.tablet } {
            flex-direction: column;
            justify-align: center;
            align-items: center;
            gap: 8px;
        }

        span {
            position: relative;
            font-size: 13px;
            color: ${({theme}) => theme.colors.gray600 }; 

            &::after {
                position: absolute;
                top: 1px;
                right: -9px;
                content: '';
                width: 1px;
                height: 13px;
                background-color: ${({theme}) => theme.colors.gray600 }; 
                @media ${ ({theme}) => theme.device.tablet } {
                    display: none;
                }
            }

            &:last-child::after {
                height: 0;
            }
        }
    }
`;

export const Copyright = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    color: ${({theme}) => theme.colors.gray500 };
    font-size: ${({theme}) => theme.fontSizes.xs };
    line-height: 1.5;
    text-align: center;
`;
