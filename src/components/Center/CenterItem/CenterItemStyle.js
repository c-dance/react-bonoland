import styled from 'styled-components';
import nursingIcon from '../../../assets/images/envs/ico-nursing.svg';
import houseIcon from '../../../assets/images/envs/ico-house.svg';
import townIcon from '../../../assets/images/envs/ico-town.svg';
import risingIcon from '../../../assets/images/envs/ico-rising.svg';
import trafficIcon from '../../../assets/images/envs/ico-traffic.svg';
import marketIcon from '../../../assets/images/envs/ico-market.svg';
import roadIcon from '../../../assets/images/envs/ico-road.svg';

import workIcon from '../../../assets/images/envs/ico-work.svg';
import aptIcon from '../../../assets/images/envs/ico-apt.svg';
import viewIcon from '../../../assets/images/envs/ico-view.svg';
import interIcon from '../../../assets/images/envs/ico-interior.svg';
import dayCareIcon from '../../../assets/images/envs/ico-daycare.svg';
import devIcon from '../../../assets/images/envs/ico-develop.svg';
import parkIcon from '../../../assets/images/envs/ico-park.svg';
import equipIcon from '../../../assets/images/envs/ico-equip.svg';
import homeCareIcon from '../../../assets/images/envs/ico-homecare.svg';
import busIcon from '../../../assets/images/envs/ico-bus.svg';
import adminIcon from '../../../assets/images/envs/ico-admin.svg';

import closeIcon from '../../../assets/images/icon/ico-x.svg';
import backIcon from '../../../assets/images/icon/ico-back.svg';
import accrIcon from '../../../assets/images/icon/ico-accordion.svg';
import syncIcon from '../../../assets/images/icon/ico-sync.svg';
import calcIcon from '../../../assets/images/menu/ico-calculator.svg';

export const Center = styled.article`
    position: relative;
    width: 390px;
    height: 100%;
    background-color: #fff;
    box-shadow: 3px 3px 6px rgba(0,0,0,.06);

    .mobile & {
        z-index: 40;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`;

export const Calculator = styled.button`
    z-index: 30;
    position: absolute;
    top: 20px;
    right: -50px;
    width: 38px;
    height: 38px;
    padding: 0;
    border-radius: 2px;
    box-shadow: 3px 3px 6px rgba(0,0,0,.06);
    background: url(${calcIcon}) center no-repeat #fff;
    color: ${ props => props.theme.colors.gray700 };
    font-size: ${({theme}) => theme.fontSizes.xs };
    line-height: 38px;
    text-align: center;
    white-space: nowrap;

    .mobile & {
        top: 12px;
        right: 10px;
        width: 32px;
        height: 32px;
    }
`;

export const Top = styled.div`
    height: auto;
`;

export const Accordion = styled.div`
    width: 100%;
    height: 110px;
    background-color: #fff;

    .mobile & {
        height: auto;
        background-color: ${ ({theme}) => theme.colors.primary };
        color: #fff;
    }
`;

export const AccordionSummary = styled.div`
    position: absolute;
    top: 50px;
    left: 0;
    display: flex;
    justify-content: Center;
    align-items: center;
    width: 100%;

    .mobile & {
        position: relative;
        top: 0;
        height: 56px;
    }

    .name {
        position: relative;
        font-size: 18px;
        .mobile & {
            &::before {
                position: absolute;
                top: -3px;
                right: -30px;
                width: 24px;
                height: 24px;
                content: '';
                background: url(${ accrIcon }) center no-repeat;
            }
        }
    }
`;

export const AccordionDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 42px;
    padding-top: 20px;
    overflow: hidden;
    transition: height .3s;
    font-size: 14px;

    .mobile & {
        padding-top: 0;
        gap: 8px;
        height: 0px;
        &.active { height: 56px; }
    }
`;

export const Assets = styled.div`
    display: flex;
    gap: 24px;
    margin-bottom: 16px;

    > div {
        display: flex;
        align-items: center;
        gap: 12px;

        em {
            padding: 8px;
            font-size: ${ ({theme}) => theme.fontSizes.s };
            color: #fff;
            border-radius: 2px;
            &.price { background-color: ${ ({theme}) => theme.colors.secondary } }
            &.invest { background-color: #D15F2E; }
            &.loan { background-color: ${ ({theme}) => theme.colors.secondary } }
            
            .mobile & { font-size: ${ ({theme}) => theme.fontSizes.xs }; }
        }

        span {
            .mobile & { font-size: ${ ({theme}) => theme.fontSizes.s };} 
            
        }
    }
`;

export const Corp = styled.div`
    position: absolute;
    top: 0px;
    right: 0;
    display: flex;
    flex-direction: row;
    justify-content: end;
    gap: 4px;
    width: calc(100% - 30px);
    height: 18px;
    overflow: hidden;
    img {
        height: 100%;
    }
    &.link { cursor: pointer; }
`;

export const Contents = styled.div`
    height: calc(100% - 214px);
    overflow-x: hidden;
    overflow-y: scroll;

    .mobile & {
        height: calc(100% - 160px);
    }

    > div {
        height: auto;
    }
`;

export const Thumbnail = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 280px;
    overflow: hidden;
    img {
        width: 100%;
    }

    .mobile & {
        height: 260px;
    }
`;

export const Section = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    margin-bottom: 56px;

    > h3 {
        margin-bottom: 16px;
        font-size: 18px;
    }

    > hr {
        display: block;
        width: 100%;
        border: 0;
        border-top: 1px solid ${ ({theme}) => theme.colors.gray400 };
        margin-bottom: 24px;
    }

    h3 + hr { margin-top: 0; }

`;

export const Table = styled.table`
    width: 100%;
    border: 1px solid ${ ({theme}) => theme.colors.gray200 };

    .mobile & {
        font-size: ${({theme}) => theme.fontSizes.s };
    }

    tr {
        border-bottom: 1px solid ${ ({theme}) => theme.colors.gray200 };
    }

    th {
        width: 114px;
        padding: 12px 16px;
        vertical-align: middle;
        border-right: 1px solid ${ ({theme}) => theme.colors.gray200 };
        font-weight: 500;
        white-space: nowrap;

        .mobile & { width: 100px; }
    }

    td {
        position: relative;
        width: calc(100% - 114px);
        padding: 12px 16px;
        vertical-align: middle;

        .sync {
            position: absolute;
            top: 0;
            right: 0;
            width: 38px;
            height: 41px;
            background-color: ${ ({theme}) => theme.colors.gray100 };

            &::after {
                position: absolute;
                top: calc(50% - 6px);
                left: calc(50% - 6px);
                width: 12px;
                height: 12px;
                content: '';
                background: url(${ syncIcon }) center / 100% no-repeat;
                transition: transform .3s ease-in-out;
            }
            &.on::after {
                transform: rotate(180deg);
            }
            &.on + .pyeong {
                display: block;
            }

            & + .pyeong {
                display: none;
                position: absolute;
                top: 0;
                left: 0;
                width: calc(100% - 38px);
                height: 100%;
                padding: 12px 16px;
                background-color: #fff;
            }
        }

        .mobile & { width: calc(100% - 100px);}
    }
`;

export const Description = styled.p`
    padding: 16px;
    border-radius: 10px;
    color: ${ ({theme}) => theme.colors.gray700 };
    background-color: ${ ({theme}) => theme.colors.gray200 };
    line-height: 1.625;
    .mobile & { font-size: ${ ({theme}) => theme.fontSizes.s } }
`;

export const Envs = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 30px 10px;
    width: 100%;
`;

export const Env = styled.div`
    position: relative;
    width: calc(25% - 10px);
    padding-top: 94px;
    font-size: 14px;
    text-align: center;
    white-space: nowrap;
    line-height: 1.2;

    &::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 82px;
        content: '';
        border-radius: 10px;
        background-repeat: no-repeat !important;
        background-position: center !important;
        background-color: #eee !important;
    }
    &.nursing::before { background: url(${ nursingIcon });}
    &.cluster::before { background: url(${ houseIcon }); }
    &.newTown::before { background: url(${ townIcon }); }
    &.rising::before { background: url(${ risingIcon }); }
    &.traffic::before { background: url(${ trafficIcon }); }
    &.market::before { background: url(${ marketIcon }); }
    &.road::before { background: url(${ roadIcon }); }
    &.work::before { background: url(${ workIcon }); }
    &.apt::before { background: url(${ aptIcon }); }
    &.view::before { background: url(${ viewIcon }); }
    &.interior::before { background: url(${ interIcon }); }
    &.dayCare::before { background: url(${ dayCareIcon }); }
    &.develop::before { background: url(${ devIcon }); }
    &.park::before { background: url(${ parkIcon }); }
    &.equip::before { background: url(${ equipIcon }); }
    &.bus::before { background: url(${ busIcon }); }
    &.homeCare::before { background: url(${ homeCareIcon }); }
    &.admin::before { background: url(${ adminIcon }); }

    .mobile & { 
        padding-top: 64px;
        &::before { 
            height: 56px; 
            background-color: #fff !important;
        }
    }
`;

export const Contact = styled.button`
    width: 100%;
    height: 56px;
    background-color: ${ ({theme}) => theme.colors.primary };
    color: #fff;
    
    .mobile & {
        position: fixed;
        bottom: 0;
        left: 0;
    }
`;

export const Back = styled.div`
    position: absolute;
    top: 16px;
    left: calc(100% - 40px);
    width: 24px;
    height: 24px;
    background: url(${ closeIcon }) center no-repeat;
    .mobile & {
        left: 16px;
        background: url(${ backIcon }) center no-repeat;
    }
`;

/* ===== TAB =====*/
export const TabNavs = styled.div`
    display: flex;
    gap: 0;

    .mobile & {
        padding-bottom: 16px;
    }

`;

export const TabNav = styled.div`
    flex: 1;
    height: 48px;
    text-align: center;
    line-height: 48px;
    background-color: ${ ({theme}) => theme.colors.gray100 };
    color: ${ ({theme}) => theme.colors.gray500 };
    border: none;
    cursor: pointer;

    .mobile & {
        background-color: #fff;
        border-bottom: 1px solid ${ ({theme}) => theme.colors.gray300 };
    }

    &.active {
        border: 1px solid ${ ({theme}) => theme.colors.primary };
        border-width: 1px 1px 0;
        color: ${ ({theme}) => theme.colors.primary };
        background-color: #fff;

        .mobile & {
            border-width: 0 0 2px;
        }
    }

`;

export const TabCont = styled.div`
    padding: 16px;
    display: ${ props => props.active? 'block' : 'none' };
`;

export const ChartWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(100% + 32px);
    transform: translateX(-16px);
    background-color: ${({ theme }) => theme.colors.secondary };
`;