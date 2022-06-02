import styled from 'styled-components';
import { module } from '../../themes/module';

export const Charts = styled.div`
    z-index: 12;
    position: fixed;
    bottom: 30px;
    right: 30px;
    border-radius: 20px;
    overflow: hidden;

    .mobile & {
        position: relative;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        border-radius: 0;
    }
`;

export const Wrapper = styled(module.scrollWrapper)`
    height: 100%;
    width: 100%;
    display: flex;
    gap: 0;

    .mobile & {
        flex-direction: column;
    }
`;