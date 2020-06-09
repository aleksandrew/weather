// outsource dependencies
import _ from 'lodash';
import { call, put, select, takeEvery } from 'redux-saga/effects';

// local dependencies
import { TYPES } from './types';
import { setLocalStorage } from '../../services/storage';
import { getBaseDataRequest, getDataOfCityRequest } from '../../services/api';


function * getData ({ type, ...payload }) {
    yield put({ type: TYPES.DATA, loading: true });

    try {
        const data = yield call(getBaseDataRequest);
        setLocalStorage(data);

        yield put({ type: TYPES.DATA, data });

    } catch (e) {
        yield put({ type: TYPES.SHOW_ERROR });
    }

    yield put({ type: TYPES.DATA, loading: false });
}

function * getDataOfCity ({ type, ...payload }) {
    const { id } = payload;

    yield put({ type: TYPES.DATA, loading: true });
    let currentData = yield select((state) => state.home.data);

    try {
        const newItem = yield call(getDataOfCityRequest, id);
        currentData = _.map(currentData, item => (id === item.id ? { ...newItem } : { ...item }));

        setLocalStorage(currentData);

        yield put({ type: TYPES.DATA, data: currentData });

    } catch (e) {
        yield put({ type: TYPES.SHOW_ERROR });
    }

    yield put({ type: TYPES.DATA, loading: false });
}

export default function * () {
    yield takeEvery(TYPES.GET_DATA, getData);
    yield takeEvery(TYPES.GET_DATA_CITY, getDataOfCity);
}
