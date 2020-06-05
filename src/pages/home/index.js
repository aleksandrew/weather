// outsource dependencies
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import React, { memo, useCallback, useMemo, useEffect } from 'react';

// material ui
import Grid from '@material-ui/core/Grid';

// local dependencies
import { TYPES } from './types';
import { selector } from './reducer';
import Layout from '../../components/Layout';
import SearchLine from '../../components/SearchLine';
import { TYPES as TYPESSEARCH } from '../search/types';
import WeatherCard from '../../components/WeatherCard';
import { getToLocalStorage, setToLocalStorage } from '../../services/storage';


const Main = memo(props => {
    const { data } = useSelector(selector);

    const dispatch = useDispatch();
    const getDataRequest = useCallback(() => dispatch({ type: TYPES.GET_DATA }), [dispatch]);
    const setNewData = useCallback(data => dispatch({ type: TYPES.DATA, data }), [dispatch]);
    const getDataOfCity = useCallback(id => dispatch({ type: TYPES.GET_DATA_CITY, id }), [dispatch]);
    const searchCity = useCallback(str => dispatch({ type: TYPESSEARCH.SEARCH_CITY, str }), [dispatch]);

    useEffect(() => {
        const storage = getToLocalStorage();

        if (!data) {
            if (storage) {
                setNewData(storage);
            } else {
                getDataRequest();
            }
        }
    }, [data, getDataRequest, setNewData]);

    const isListener = useCallback((event, id) => {
        if (event === 'delete') {
            let newData = data;
            newData = _.filter(newData, item => id !== item.id);

            setToLocalStorage(newData);
            setNewData(newData);
        } else if (event === 'refresh') { getDataOfCity(id); }
    }, [data, setNewData, getDataOfCity]);

    const currentData = useMemo(() =>
        data && _.map(data, (item) => ({
            id: item.id,
            name: item.name,
            country: item.sys.country,
            windSpeed: item.wind.speed,
            humidity: item.main.humidity,
            pressure: item.main.pressure,
            temp: Math.round(item.main.temp),
            description: item.weather[0].description,
        })), [data]);

    return (
        <Layout >
            <SearchLine {...props} searchCity={searchCity} />
            <Grid container spacing={3}>
                {_.map(currentData, (tile) =>
                    <WeatherCard searchCity={searchCity} isListener={isListener} key={tile.id} {...tile} />
                )}
            </Grid>
        </Layout>
    );
});

export default Main;
