import styled from 'styled-components';
import resetIcon from '../../../assets/images/icon/ico-reset.svg';

export const CategoryForm = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 390px;
    height: 48px;
    padding: 16px 30px;
    margin-bottom: 16px;
    background-color: #fff;
    box-shadow: 3px 3px 6px rgba(0,0,0,.06);

    .mobile & {
        z-index: 30;
        position: fixed;
        flex-direction: column;
        gap: 10px;
        top: 96px;
        left: 14px;
        width: 32px;
        height: auto;
        padding: 0;
        background-color: transparent;
        box-shadow: none;
    }
`;

export const Category = styled.div`
    display: block;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;

    input {
        position: absolute;
        width: 0;
        height: 0;
        opacity: 0;
    }

    label {
        color: ${ ({theme}) => theme.colors.gray800 };
    }

    input:checked + label {
        color: ${ ({theme}) => theme.colors.primary };
    }

    .mobile &  {
        width: 32px;
        height: 32px;
        border-radius: 2px;
        box-shadow: 3px 3px 6px rgba(0,0,0,.06);
        background-color: #fff;

        label {
            display: block;
            width: 100%;
            height: 100%;
            text-align: center;
            line-height: 32px;
            font-size: ${ ({theme}) => theme.fontSizes.xs };
        }

        input:checked + label {
            background-color: ${ ({theme}) => theme.colors.primary };
            color: #fff;
        }

    }
`;

export const CapacityForm = styled.form`
    position: absolute;
    top: 56px;
    left: 400px;
    flex-direction: column;
    gap: 24px;
    width: 340px;
    height: 300px;
    padding: 25px;
    background-color: #fff;
    box-shadow: 3px 3px 6px rgba(0,0,0,.06);
    display: flex;
    
    .mobile & {
        z-index: 30;
        position: fixed;
        left: 0;
        top: auto;
        bottom: -370px;
        display: flex;
        width: 100%;
        height: 308px;
        box-shadow: 0 -3px 6px rgba(0,0,0,.06);
        transition: bottom .5s;

        &.active { bottom: 56px; }
    }
`;

export const Legend = styled.div`
    font-weight: 500;
    color: ${ props => props.theme.colors.gray900 };
`;

export const SliderWrap = styled.div`
    padding: 0 17px;
    margin: 20px 0 25px;
`;

export const RadioWrap = styled.div`
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    
    .mobile & {
        justify-content: center;
        align-items: center;
    }
`;

export const RadioBox = styled.div`
    position: relative;
    width: 68px;
    height: 34px;

    input {
        position: absolute;
        width: 0; 
        height: 0; 
        opacity: 0;
    }

    label {
        display: block;
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 14px;
        line-height: 32px;
        border: 1px solid ${ props => props.theme.colors.gray300 };
    }

    input:checked + label {
        background-color: #000036;
        color: #fff;
    }
`;

export const Reset = styled.button`
    position: absolute;
    top: 25px;
    right: 25px;
    padding-left: 20px;
    background: url(${ resetIcon }) left center no-repeat #fff;
    font-size: 14px;
    color: ${ props => props.theme.colors.gray600 };
`;

export const Actions = styled.div`
    display: flex;
    gap: 14px;
    justify-content: center;
    align-items: center;
    width: 100%;

    button {
        width: 100px;
        height: 40px;
        border-radius: 2px;
        background-color: ${ ({theme}) => theme.colors.gray300 };
        color: ${ ({theme}) => theme.colors.gray700 };
        ;

        &.submit {
            background-color: ${ ({theme}) => theme.colors.secondary };
            color: #fff;
        }
    }
`;
