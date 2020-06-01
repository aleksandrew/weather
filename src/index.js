import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import store from "./reducer";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want your reducer to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
