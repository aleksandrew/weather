// outsource dependencies
import { call, put, select, takeEvery } from 'redux-saga/effects';
import _ from 'lodash';

// local dependencies
import { TYPES } from './types';
import {getBaseDataRequest, getDataOfCityRequest, searchRequest} from '../../services/api';
import {setToLocalStorage} from "../../services/storage";


function* getData({ type, ...payload }) {
  yield put({ type: TYPES.DATA, loading: true });

  try {
    const data = yield call(getBaseDataRequest);
    setToLocalStorage(data);

    yield put({ type: TYPES.DATA, data });

  } catch (e) {
    yield put({type: TYPES.SHOW_ERROR});
  }

  yield put({ type: TYPES.DATA, loading: false });
}

function* search({ type, ...payload }) {
  const { str } = payload;

  yield put({ type: TYPES.DATA, loading: true, inputData: str });

  try {
    const item = yield call(searchRequest, str);
    console.log(123)

    yield put({ type: TYPES.DATA, currentCity: item});

  } catch (e) {
    yield put({type: TYPES.SHOW_ERROR});
  }

  yield put({ type: TYPES.DATA, loading: false });
}

export default function * () {
  // yield takeEvery(TYPES.GET_DATA, getData);
  yield takeEvery(TYPES.SEARCH_CITY, search);
}
