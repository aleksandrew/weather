// outsource dependencies
import { fork } from 'redux-saga/effects';

// local dependencies
import sagasHome from '../pages/home/saga';


function * sagasRoot () {
    yield fork(sagasHome);
}

export default sagasRoot;
