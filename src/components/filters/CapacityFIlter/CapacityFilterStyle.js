import styled from 'styled-components';
import ResetIcon from '../../../assets/images/icon/ico-reset.svg';

export const CapacityForm = styled.div`
    position: fixed;
    top: 160px;
    left: 430px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 340px;
    height: 300px;
    padding: 25px;
    background-color: #fff;
    box-shadow: 3px 3px 6px rgba(0,0,0,.06);
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
    background: url(${ ResetIcon }) left center no-repeat #fff;
    font-size: 14px;
    color: ${ props => props.theme.colors.gray600 };
`;

export const Confirm = styled.button`
    width: 100px;
    height: 40px;
    margin: 0 auto;
    border-radius: 2px;
    background-color: #001F60;
    color: #fff;
`;