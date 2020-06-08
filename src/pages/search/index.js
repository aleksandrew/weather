// outsource dependencies
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import React, { memo, useCallback, useMemo, useEffect, useState } from 'react';

// material ui
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

// local dependencies
import { TYPES } from './types';
import InfoCard from './InfoCard';
import TempChart from './TempChart';
import Loader from '../../components/Loader';
import Layout from '../../components/Layout';
import { TYPES as HOMETYPES } from '../home/types';
import SearchLine from '../../components/SearchLine';
import { selector as searchSelector } from './reducer';
import { parseOfUnixTimestap } from '../../services/date';
import { selector as homeSelector } from '../home/reducer';
import { setToLocalStorage } from '../../services/storage';


const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            position: 'relative',
        },
        card: {
            width: '100%',
            margin: 5,
        },
        cardCharts: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            margin: 5,
        },
        cardContainerColumn: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        cardContainerRow: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        btn: {
            position: 'fixed',
            bottom: 15,
            right: 12,
            display: 'block',
            zIndex: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
        },
    })
);

const Search = memo(props => {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:980px)');

    const { match } = props;
    const { data } = useSelector(homeSelector);
    const { currentCity, inputData } = useSelector(searchSelector);

    const [includeOfData, setIncludeOfData] = useState(false);

    const dispatch = useDispatch();
    const getDataRequest = useCallback(() => dispatch({ type: HOMETYPES.GET_DATA }), [dispatch]);
    const setNewData = useCallback(data => dispatch({ type: HOMETYPES.DATA, data }), [dispatch]);
    const searchCity = useCallback(str => dispatch({ type: TYPES.SEARCH_CITY, str }), [dispatch]);

    useEffect(() => {
        if (currentCity) {
            setIncludeOfData(_.some(data, item => currentCity.city.id === item.id));
        }

        if (!inputData) {
            searchCity(match.params.city);
        }
    }, [currentCity, data, getDataRequest, inputData, match.params.city, searchCity, setNewData]);

    const isHandler = useCallback((event, id) => {
        let newData;

        if (event === 'delete') {
            newData = _.filter(data, item => id !== item.id);
        }

        if (event === 'add') {
            const newCityDate = {
                id: currentCity.city.id,
                name: currentCity.city.name,
                sys: { country: currentCity.city.country },
                wind: { speed: currentCity.list[0].wind.speed },
                weather: [{ description: currentCity.list[0].weather[0].description }],
                main: {
                    humidity: currentCity.list[0].main.humidity,
                    pressure: currentCity.list[0].main.pressure,
                    temp: currentCity.list[0].main.temp,
                },
            };

            newData = [{ ...newCityDate }, ...data];
        }

        setNewData(newData);
        setToLocalStorage(newData);
    }, [data, setNewData, currentCity]);

    const optionsTime = { hour: '2-digit', minute: '2-digit' };
    const optionsDate = { weekday: 'long', hour: '2-digit', minute: '2-digit' };
    const optionsFullDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const currentData = useMemo(() =>
        currentCity && ({
            id: currentCity.city.id,
            name: currentCity.city.name,
            country: currentCity.city.country,
            // current
            windSpeed: currentCity.list[0].wind.speed,
            humidity: currentCity.list[0].main.humidity,
            pressure: currentCity.list[0].main.pressure,
            weather: currentCity.list[0].weather[0].main,
            temp: Math.round(currentCity.list[0].main.temp),
            tempMax: Math.round(currentCity.list[0].main.temp_max),
            tempMin: Math.round(currentCity.list[0].main.temp_min),
            description: currentCity.list[0].weather[0].description,
            timeSunset: parseOfUnixTimestap(currentCity.city.sunset).toLocaleDateString('en-US', optionsTime),
            timeSunrise: parseOfUnixTimestap(currentCity.city.sunrise).toLocaleDateString('en-US', optionsTime),
            timeWeatherReport: parseOfUnixTimestap(currentCity.list[0].dt).toLocaleDateString('en-US', optionsDate),
            // weather map
            weatherMap: _.map(currentCity.list, item => ({
                id: item.dt,
                windSpeed: item.wind.speed,
                humidity: item.main.humidity,
                pressure: item.main.pressure,
                weather: item.weather[0].main,
                temperature: Math.round(item.main.temp),
                time: parseOfUnixTimestap(item.dt).toLocaleTimeString('en-US', optionsTime),
                fullTime: parseOfUnixTimestap(item.dt).toLocaleDateString('en-US', optionsFullDate),
            })),
        }), [currentCity, optionsDate, optionsTime, optionsFullDate]);

    return !currentData
        ? <Loader/>
        : <Layout>
            <div className={classes.root} >

                <div className={classes.btn}>
                    {includeOfData
                        ? <IconButton
                            color="inherit"
                            aria-label="delete {name} card"
                            onClick={() => isHandler('delete', currentData.id)}
                        >
                            <HighlightOffIcon style={{ color: '#fff' }} fontSize="large"/>
                        </IconButton>
                        : <IconButton
                            color="inherit"
                            aria-label="add {name} card"
                            onClick={() => isHandler('add', currentData.id)}
                        >
                            <AddCircleOutlineIcon style={{ color: '#fff' }} fontSize="large"/>
                        </IconButton>
                    }
                </div>

                <SearchLine {...props} inputData={inputData} searchCity={searchCity}/>
                <div className={matches ? classes.cardContainerRow : classes.cardContainerColumn }>
                    <Card variant="outlined" className={classes.card} >
                        <InfoCard data={currentData} />
                    </Card>
                    <Card variant="outlined" className={classes.cardCharts}>
                        <TempChart matches={matches} data={currentData.weatherMap}/>
                    </Card>
                </div>
            </div>
        </Layout>;
});

Search.propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default Search;
