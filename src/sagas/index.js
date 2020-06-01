// outsource dependencies
import { fork, all } from 'redux-saga/effects';

// local dependencies
import sagasHome from '../pages/home/saga';


function* sagasRoot () {
    yield all([fork(sagasHome)]);
}

export default sagasRoot;
