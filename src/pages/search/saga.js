// outsource dependencies
import { call, put, select, takeEvery } from 'redux-saga/effects';
import _ from 'lodash';

// local dependencies
import { TYPES } from './types';
import {getBaseDataRequest, getDataOfCityRequest} from '../../services/api';
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

function* getDataOfCity({ type, ...payload }) {
  const { id } = payload;

  yield put({ type: TYPES.DATA, loading: true });
  let currentData = yield select((state) => state.home.data);

  try {
    const newItem = yield call(getDataOfCityRequest, id);
    currentData = _.map(currentData, item => id === item.id ? {...newItem} : {...item} );
    setToLocalStorage(currentData);

    yield put({ type: TYPES.DATA, data: currentData});

  } catch (e) {
    yield put({type: TYPES.SHOW_ERROR});
  }

  yield put({ type: TYPES.DATA, loading: false });
}

export default function * () {
  yield takeEvery(TYPES.GET_DATA, getData);
  yield takeEvery(TYPES.GET_DATA_CITY, getDataOfCity);
}
