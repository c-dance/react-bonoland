import { BrowserRouter } from "react-router-dom";
import App from './App';
import AppStyle from './AppStyle';

const Root = () => (
    <BrowserRouter>
        <AppStyle />
        <App />
    </BrowserRouter>
);

export default Root;