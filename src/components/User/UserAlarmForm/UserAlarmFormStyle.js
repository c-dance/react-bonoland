import styled from 'styled-components';

export const AlarmForm = styled.div`
    hr {
        width: 100%;
        height: 10px;
        border: 0;
        background-color: ${ ({theme}) => theme.colors.gray100 };
    }
`;

export const Head = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 24px;

    h2 {
        font-size: ${ ({theme}) => theme.fontSizes.l };
    }

    p {
        font-size: ${ ({theme}) => theme.fontSizes.s };
        line-height: 1.7;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 12px;

    fieldset {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        width: 100%;
    }
`;

export const RadioBox = styled.div`
    position: relative;
    flex: 1;
    height: 40px;
    overflow: hidden;
    border-radius: 2px;
    box-shadow: 3px 3px 6px rgba(0,0,0,.06);

    input {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
    }

    label {
        display: block;
        width: 100%;
        height: 100%;
        line-height: 40px;
        text-align: center;
        font-size: ${ ({theme}) => theme.fontSizes.s };
    }
`;