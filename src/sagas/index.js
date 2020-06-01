// outsource dependencies
import { fork, all } from 'redux-saga/effects';

// local dependencies
import sagasHome from '../pages/home/saga';
import sagasSearch from '../pages/search/saga';


function* sagasRoot () {
    yield all([
        fork(sagasHome),
        fork(sagasSearch)
    ]);
}

export default sagasRoot;
