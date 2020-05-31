// outsource dependencies
import _ from 'lodash';
import { takeEvery, put, call, select } from 'redux-saga/effects';

// local dependencies
import { TYPES } from '../constans/types';
import {getData, getDataList} from '../services/api';

function* setData({ type, ...payload }) {
  const {currentCategory, isNewData} = payload;
  const titleDrink = { isTitle: true, idDrink: currentCategory, strDrink: currentCategory };

  yield put({ type: TYPES.DATA, loading: true });
  const appData = yield select(state => state.app.data);

  try {
    const response = yield call(getData, currentCategory);

    const dataArray = isNewData ? [titleDrink, ...response] : [...appData, titleDrink, ...response] ;
    yield put({ type: TYPES.DATA, data: [...dataArray] });

  } catch (e) {
    yield put({type: TYPES.SHOW_ERROR});
  }

  yield put({ type: TYPES.DATA, loading: false });
}

function* allCategory({ type, ...payload }) {
  yield put({ type: TYPES.DATA, loading: true });

  try {
    const response = yield call(getDataList);

    const payload = _.map(response, item => item.strCategory);

    yield put({ type: TYPES.DATA, category: [...payload] });

  } catch (e) {
    yield put({type: TYPES.SHOW_ERROR});
  }

  yield put({ type: TYPES.DATA, loading: false });
}

export default function* () {
  yield takeEvery(TYPES.SET_DATA, setData);
  yield takeEvery(TYPES.GET_CATEGORY, allCategory);
}
