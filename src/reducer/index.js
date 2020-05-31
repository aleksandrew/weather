// outsource dependencies
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, combineReducers, createStore } from 'redux';

// local dependencies
// import sagasRoot from '../sagas';


// dev tools middleware
const reduxDevTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const reducers = combineReducers({
    // app: appReducer,
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware), reduxDevTools);
sagaMiddleware.run(sagasRoot);

export default store;
