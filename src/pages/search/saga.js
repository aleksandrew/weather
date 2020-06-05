// outsource dependencies
import _ from 'lodash';
import { call, put, takeLatest } from 'redux-saga/effects';

// local dependencies
import { TYPES } from './types';
import { searchRequest } from '../../services/api';
import { parseToUnixTimestap } from '../../services/date';


function * search ({ type, ...payload }) {
    const { str } = payload;

    let todayMidnight = new Date().setHours(0, 0, 0, 0);
    todayMidnight = new Date(todayMidnight);
    const finishedToday = todayMidnight.setDate(todayMidnight.getDate() + 1);
    const finishedTomorrow = todayMidnight.setDate(todayMidnight.getDate() + 2);

    const finishedTodayUnixData = parseToUnixTimestap(new Date(finishedToday));
    const finishedTomorrowUnixData = parseToUnixTimestap(new Date(finishedTomorrow));

    yield put({ type: TYPES.DATA, loading: true, inputData: str });

    try {
        const currentCity = yield call(searchRequest, str);

        const { list } = currentCity;
        const timeData = _.filter(list, item => finishedTodayUnixData >= item.dt);
        timeData.length <= 2 && _.filter(list, item => finishedTomorrowUnixData >= item.dt);
        console.log({ ...currentCity, list: [...timeData] });

        yield put({ type: TYPES.DATA, currentCity: { ...currentCity, list: [...timeData] } });

    } catch (e) {
        yield put({ type: TYPES.SHOW_ERROR });
    }

    yield put({ type: TYPES.DATA, loading: false });
}

export default function * () {
    yield takeLatest(TYPES.SEARCH_CITY, search);
}
