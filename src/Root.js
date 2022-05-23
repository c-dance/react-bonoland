import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from "./store";
import App from './App';
import AppStyle from './AppStyle';
import { ThemeProvider } from "styled-components";
import { theme, module } from './theme'

const Root = () => (
    <BrowserRouter>
        <Provider store={ store }>
            <ThemeProvider theme={ theme } module={ module }>
                <AppStyle />
                <App />
            </ThemeProvider>
        </Provider>
    </BrowserRouter>
);

export default Root;