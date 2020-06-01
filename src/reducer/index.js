// outsource dependencies
import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';

// local dependencies
import homeReducer from '../pages/home/reducer';
import sagasRoot from "../sagas";


// eslint-disable-next-line
const enchantedCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    home: homeReducer,
});

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(reducers, enchantedCompose(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(sagasRoot);
