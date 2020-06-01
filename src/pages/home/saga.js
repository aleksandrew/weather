// outsource dependencies
import { takeEvery, put, call } from 'redux-saga/effects';

// local dependencies
import { TYPES } from '../../constans/types';
import {getBaseData} from '../../services/api';

function* getData({ type, ...payload }) {
  yield put({ type: TYPES.DATA, loading: true });

  try {
    const data = yield call(getBaseData);

    yield put({ type: TYPES.DATA, data });

  } catch (e) {
    yield put({type: TYPES.SHOW_ERROR});
  }

  yield put({ type: TYPES.DATA, loading: false });
}

export default function* () {
  yield takeEvery(TYPES.GET_DATA, getData);
}
