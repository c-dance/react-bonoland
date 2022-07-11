import styled from 'styled-components';
import searchIcon from '../../../assets/images/icon/ico-search.svg'
import symbolIcon from '../../../assets/images/logo/ico-symbol.svg'

export const AddressForm = styled.form`
    position: relative;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: 56px;
    padding: 0 24px;
    background-color: #fff;
    box-shadow: 3px 0 6px rgba(0,0,0,.06);

    input {
        display: block;
        flex: 1;
        backgo
    }

    button[type="submit"] {
        width: 28px;
        height: 28px;
        font-size: 0;
        background: url(${ searchIcon }) center no-repeat;
    }

    .mobile & {
        height: 44px;
        padding: 0 16px 0 42px;

        &.main {
            z-index: 40;
            position: fixed;
            top: 20px;
            left: 14px;
            width: calc(100% - 28px);
            border-radius: 2px;
        }
    }
    
    &.main {
        width: 100%;
        border-radius: 2px;
    }
`;

export const Home = styled.button`
    position: absolute;
    top: 0;
    left: 0;
    width: 44px;
    height: 44px;
    border: 0;
    background: url(${ symbolIcon }) 16px center no-repeat #fff;
`;
