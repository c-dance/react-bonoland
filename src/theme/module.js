import styled from 'styled-components';

/* ===== MODULES ===== */
export const scrollWrapper = styled.div`
    overflow-x: hidden;
    overflow-y: scroll;

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

export const Button = styled.button`
    width: 100%;
    border-radius: 2px;
    text-align: center;
`;

export const Input = styled.input`
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

export const Fieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

export const SubmitButton = styled(Button)`
    height: 48px;
    line-height: 48px;
    background-color: #BD9369;
    color: #fff;

    &.disabled {
        background-color: #f4f4f4;
        color: #BDBDBD;
    }

`;