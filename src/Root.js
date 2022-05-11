import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from "./store";
import App from './App';
import AppStyle from './AppStyle';


const Root = () => (
    <BrowserRouter>
        <AppStyle />
        <Provider store={ store }>
            <App />
        </Provider>
    </BrowserRouter>
);

export default Root;