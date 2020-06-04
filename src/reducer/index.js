// outsource dependencies
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

// local dependencies
import sagasRoot from '../sagas';
import homeReducer from '../pages/home/reducer';
import searchReducer from '../pages/search/reducer';


// eslint-disable-next-line
const enchantedCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    home: homeReducer,
    search: searchReducer,
});

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(reducers, enchantedCompose(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(sagasRoot);
