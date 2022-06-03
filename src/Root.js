import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from "./store";
import App from './App';
import AppStyle from './AppStyle';
import { ThemeProvider } from "styled-components";
import { theme } from './themes/theme';
import { LayoutContext } from "./hooks/layout";
import { isMobile } from 'react-device-detect';
import React from "react";

const Root = () => (

    <BrowserRouter>
        <Provider store={ store }>
            <LayoutContext.Provider value={ isMobile? "mobile" : "browser" }>
                <ThemeProvider theme={ theme }>
                    <AppStyle />
                    <App />
                </ThemeProvider>
            </LayoutContext.Provider>
        </Provider>
    </BrowserRouter>
);

export default Root;