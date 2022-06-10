import styled from 'styled-components';
import { module } from '../../themes/module';

export const AgreementBox = styled.div`

    h3 {
        font-size: ${({theme}) => theme.fontSizes.l };
        font-weight: ${({theme}) => theme.fontWeights.medium };
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 56px;

        fieldset {
            display: flex;
            gap: 8px;
        }

        button {
            width: 160px;
            height: 52px;
            margin: 0 auto;
        }
    }

    

    /* === MOBILE === */
    .mobile & {
        height: 100%;

        h3 {
            font-size: ${({theme}) => theme.fontSizes.s }; 
        }

        form {
            fieldset {
                font-size: ${({theme}) => theme.fontSizes.s };  
            }

            button {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 52px;
            }
        }
    }
`;


export const Terms = styled(module.scrollWrapper)`
    width: 100%;
    height: 100px;
    margin: 16px 0 12px;
    padding: 12px;
    font-size: 14px;
    border: 1px solid ${({theme}) => theme.colors.gray300 };
    color: ${({ theme }) => theme.colors.gray600 };

    .mobile & {
        margin: 16px 0 20px;
        height: 146px;
    }
`;