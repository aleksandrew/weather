import './index.css'
import App from './pages';
import React from 'react';
import {store} from "./reducer";
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <BrowserRouter >
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
