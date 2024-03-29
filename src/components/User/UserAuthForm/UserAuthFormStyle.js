import styled from 'styled-components';

export const Inform = styled.div`
    margin: 40px 0;
    text-align: center;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 24px;

    button {
        margin-top: 12px;
    }

    .newPwd {
        color: ${ ({theme}) => theme.colors.gray600 };
        font-size: 13px;
        text-decoration: underline;
        cursor: pointer;
    }
`;
