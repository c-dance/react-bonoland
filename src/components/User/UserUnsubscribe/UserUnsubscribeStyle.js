import styled from 'styled-components';

export const Unsubscribe = styled.form`
    display: flex;
    flex-direction: column;
    gap: 32px;
    
    p {
        font-size: ${ ({theme}) => theme.fontSizes.s };
        line-height: 1.5;
        em {
            color: ${ ({theme}) => theme.colors.blue };
        }
    }

    div {
        position: realative;
        display: flex;
        gap: 8px;
        justify-content: start;
        align-items: center;

        label {
            color: ${ ({theme}) => theme.colors.gray900 }; 
        }
    }

    .warn {
        position: absolute;
        top: calc(100% + 4px);
        left: 24px;
        font-size: ${ ({theme}) => theme.fontSizes.s };
        color: ${ ({theme}) => theme.colors.red };
    }

`;