// outsource dependencies
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import React, { memo, useCallback, useMemo, useEffect, useState } from 'react';

// material ui
import Card from '@material-ui/core/Card';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

// local dependencies
import { TYPES } from './types';
import Loader from '../../components/Loader';
import { TYPES as HOMETYPES } from '../home/types';
import SearchLine from '../../components/SearchLine';
import { selector as searchSelector } from './reducer';
import { parseOfUnixTimestap } from '../../services/date';
import { selector as homeSelector } from '../home/reducer';
import { setToLocalStorage } from '../../services/storage';
import Layout from '../../components/Layout';


const useStyles = makeStyles(theme =>
    createStyles({
        card: {
            position: 'relative',
        },
        cardContainer: {
            flexGrow: 0,
            maxWidth: '100%',
            flexBasis: '100%',
        },
        btn: {
            position: 'absolute',
            bottom: 15,
            right: 12,
            display: 'block',
            zIndex: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
        },
        vertical: {
            display: 'flex',
            flexDirection: 'column',
        },
        infoWeather: {
            fontSize: '1.2rem',
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'flex-end',
        },
        padding0: {
            padding: 0,
        },
        title: {
            padding: 0,
            display: 'flex',
            fontSize: '1.8rem',
            flexDirection: 'row',
        },
        topCard: {
            padding: 0,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        bottomCard: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        gridList: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
        },
        footerBtn: {
            marginTop: 20,
            borderRadius: 0,
            padding: '20px 0',
        },
        temperature: {
            fontSize: '6rem',
            padding: '0 10%',
        },
        temperatureSymbol: {
            fontSize: '1.7rem',
        }
    })
);

const Search = memo(props => {
    const classes = useStyles();

    const { match } = props;
    const { data } = useSelector(homeSelector);
    const { currentCity, inputData } = useSelector(searchSelector);

    const [includeOfData, setIncludeOfData] = useState(false);
    const [visible, setVisible] = useState({ isVisible: false, id: null });

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

    const isVisibleTitle = useCallback(
        (id = null) => {
            if (id || !visible.isVisible) {
                setVisible({ isVisible: true, id });
            } else if (visible.isVisible) {
                setVisible({ isVisible: false, id: null });
            }
        },
        [visible]
    );

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


    const optionsDate = { weekday: 'long', hour: '2-digit', minute: '2-digit' };
    const optionsTime = { hour: '2-digit', minute: '2-digit' };
    console.log(currentCity && parseOfUnixTimestap(currentCity.list[0].dt).toLocaleDateString('en-US', optionsDate))
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
                weather: item.weather[0].main,
                temp: Math.round(item.main.temp),
                timeWeatherReport: parseOfUnixTimestap(item.dt).toLocaleDateString('en-US', optionsTime),
            })),
        }), [currentCity, optionsDate, optionsTime]);

    return !currentData
        ? <Loader/>
        : <Layout>
            <div className={classes.root}>
                <SearchLine {...props} inputData={inputData} searchCity={searchCity}/>
                <Card
                    variant="outlined"
                    className={classes.card}
                    onMouseLeave={() => isVisibleTitle()}
                    onMouseEnter={() => isVisibleTitle(currentData.id)}
                >
                    <Slide direction="up" in={visible.id === currentData.id}>
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
                    </Slide>

                    <CardContent className={classes.topCard}>
                        <CardContent className={classes.vertical}>
                            <CardContent className={classes.title}>
                                <Typography className={classes.title} component="h2">
                                    {currentData.name}
                                </Typography>
                                <Typography className={classes.title} component="h2">
                                    , {currentData.country}
                                </Typography>
                            </CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                {currentData.timeWeatherReport}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                {currentData.description}
                            </Typography>
                        </CardContent>
                        <CardContent className={classes.vertical}>
                            <Typography color="textSecondary" gutterBottom>
                                time sunrise: {currentData.timeSunrise}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                time sunset: {currentData.timeSunset}
                            </Typography>
                        </CardContent>
                    </CardContent>
                    <CardContent className={classes.bottomCard}>
                        <CardContent className={classes.vertical + classes.padding0}>
                            <CardContent className={classes.title}>
                                <Typography className={classes.temperature}>
                                    {currentData.temp}
                                </Typography>
                                <sup className={classes.temperatureSymbol}>°C</sup>
                            </CardContent>
                            <br/>
                            <CardContent style={{ padding: 0 }} className={classes.vertical}>
                                <Typography color="textSecondary" gutterBottom>
                                    min. temperature: {currentData.tempMin}
                                    <sup>°C</sup>
                                </Typography>
                                <Typography color="textSecondary" gutterBottom>
                                    min. temperature: {currentData.tempMax}
                                    <sup>°C</sup>
                                </Typography>
                            </CardContent>
                        </CardContent>
                        <CardContent className={classes.infoWeather}>
                            <Typography color="textSecondary" gutterBottom>
                                Wind: {currentData.windSpeed} m/s
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                Humidity: {currentData.humidity} %
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                Pressure: {currentData.pressure} hpa
                            </Typography>
                        </CardContent>
                    </CardContent>
                </Card>
                {/*<Card*/}

                {/*</Card>*/}
            </div>
        </Layout>;
});

Search.propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default Search;
