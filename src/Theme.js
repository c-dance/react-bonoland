import styled from 'styled-components';

/* ===== VARIABLES ===== */
const fontSizes = {
    xl:'1.25rem',
    l: '1.125rem',
    base: '1rem',
    s: '0.875rem',
    xs: '0.75rem',
    xxs: '0.625rem'
};

const fontWeights = {
    light: '300',
    regular: '400',
    medium: '500',
    bold: '700'
};

const breakPoints = {
    desktopL: "1920px",
    desktopM: "1440px",
    desktopS: "1240px",
    tablet: "1024px",
};

const device = {
    desktopL: `screen and (max-width: ${ breakPoints.desktopL })`,
    desktopM: `screen and (max-width: ${ breakPoints.desktopM })`,
    desktopS: `screen and (max-width: ${ breakPoints.desktopS })`,
    tablet: `screen and (max-width: ${ breakPoints.tablet })`
};

const colors = {
    primary: "#BD9369",
    primaryD: "#8b653e",
    secondary: "#001f60",
    secondaryL: "#3e468e",
    blue: "#2962FF",
    red: "#B71C1C",
    gray100:"#f4f4f4", 
    gray200:"#EEEEEE", 
    gray300:"#E0E0E0", 
    gray400:"#bdbdbd", 
    gray500:"#9E9E9E", 
    gray600:"#757575", 
    gray700:"#616161", 
    gray800:"#424242", 
    gray900:"#212121", 
};

/* ===== MODULES ===== */
const scrollWrapper = styled.div`
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

const Button = styled.button`
    width: 100%;
    border-radius: 2px;
    text-align: center;
`;

const Input = styled.input`
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

const Fieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const SubmitButton = styled(Button)`
    height: 48px;
    line-height: 48px;
    background-color: #BD9369;
    color: #fff;
    margin: 0 auto;

    &.disabled {
        background-color: #f4f4f4;
        color: #BDBDBD;
    }

`;

const TableForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    
    fieldset {
        display: flex;
        flex-direction: column;

        legend {
            margin-bottom: 12px;
            font-size: 18px;
            font-weight: 500;
        }

        table {
            width: 100%;
            border: 1px solid #E0E0E0;
            tr {
                border-bottom: 1px solid #E0E0E0;
                &:last-child { border-bottom: 0; }

                th {
                    height: 37px;
                    background-color: #8B653E;
                    color: #FFF;

                    label {
                        display: flex;
                        height: 100%;
                        justify-content: center;
                        align-items: center;
                    }
                }

                td {
                    height: 100%;
                    vertical-align: center;

                    input, 
                    select {
                        display: block;
                        width: 100%;
                        height: 100%;
                        padding: 0 12px;
                        border: 0;
                    }

                    select {
                        color: #757575;
                    }

                    textarea {
                        display: block;
                        width: 100%;
                        height: 74px;
                        padding: 12px;
                        border: 0;
                        resize: none;
                    }
                }
            }
        }
    }
`;


export const theme = {
    fontSizes,
    fontWeights,
    colors,
    device,
};

export const module = {
    scrollWrapper,
    Fieldset,
    Input,
    SubmitButton,
    TableForm
};