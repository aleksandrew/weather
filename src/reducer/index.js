// outsource dependencies
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, combineReducers, createStore } from 'redux';

// local dependencies
import homeReducer from '../pages/home/reducer';
import sagasRoot from "../sagas";


// dev tools middleware
const reduxDevTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const reducers = combineReducers({
    home: homeReducer,
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware), reduxDevTools);
sagaMiddleware.run(sagasRoot);

export default store;
