// outsource dependencies
import _ from 'lodash';
import Grid from "@material-ui/core/Grid";
import {useDispatch, useSelector} from 'react-redux';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import React, {memo, useCallback, useMemo, useEffect} from 'react';

// local dependencies
import {TYPES} from "./types";
import {selector} from './reducer';
import WeatherCard from "../../components/WeatherCard";
import {getToLocalStorage, setToLocalStorage} from "../../services/storage";
import SearchLine from "../../components/SearchLine";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {parseOfUnixTimestap, setCurrentData} from "../../services/date";
import Loader from "../../components/Loader";


const useStyles = makeStyles(theme =>
    createStyles({
        cardContainer: {
            flexGrow: 0,
            maxWidth: '100%',
            flexBasis: '100%',
        },
        btn: {
            position: 'absolute',
            top: 15,
            right: 12,
            display: 'block',
            zIndex: 2,
        },
        topCard: {
            display: 'flex',
            flexDirection: 'column',
        },
        title: {
            padding: 0,
            display: 'flex',
            fontSize: '1.8rem',
            flexDirection: 'row',
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
            fontSize: '4rem',
        },
        temperatureSymbol: {
            fontSize: '1.7rem',
        }
    })
);

const Search = memo(props => {
    const classes = useStyles();

    const {currentCity, inputData} = useSelector(selector);
    // const curentData =   setCurrentData();
    // const aaa = _.filter(currentCity, item => _.map(item, day => `${curentData} 00:00:00` <= item.dt_txt <= `${curentData} 23:00:00`))

    const dispatch = useDispatch();
    // const getDataRequest = useCallback(() => dispatch({type: TYPES.GET_DATA}), [dispatch]);
    // const setNewData = useCallback(data => dispatch({type: TYPES.DATA, data}), [dispatch]);
    // const getDataOfCity = useCallback(id => dispatch({type: TYPES.GET_DATA_CITY, id}), [dispatch]);
    const searchCity = useCallback(str => dispatch({type: TYPES.SEARCH_CITY, str}), [dispatch]);

    useEffect(() => {
        // currentCity &&
    }, []);

    const setSearch = useCallback(str => {
    }, []);

    const currentData = useMemo(() =>
        currentCity && ({
            id: currentCity.city.id,
            name: currentCity.city.name,//
            country: currentCity.city.country,//
            // current
            windSpeed: currentCity.list[0].wind.speed,
            humidity: currentCity.list[0].main.humidity,
            pressure: currentCity.list[0].main.pressure,
            weather: currentCity.list[0].weather[0].main,
            temp: Math.round(currentCity.list[0].main.temp),
            tempMax: Math.round(currentCity.list[0].main.temp_max),
            tempMin: Math.round(currentCity.list[0].main.temp_min),
            description: currentCity.list[0].weather[0].description,
            timeSunset: parseOfUnixTimestap(currentCity.city.sunset).toLocaleDateString('en-US'),
            timeSunrise: parseOfUnixTimestap(currentCity.city.sunrise).toLocaleDateString('en-US'),
            timeWeatherReport: parseOfUnixTimestap(currentCity.list[0].dt).toLocaleDateString('en-US'),
            // weather map
            weatherMap: _.map(currentCity.list, item => ({
                id: item.dt,
                weather: item.weather[0].main,
                temp: Math.round(item.main.temp),
                timeWeatherReport: parseOfUnixTimestap(item.dt).toLocaleDateString('en-US'),
            })),
        }), [currentCity]);
    console.log(currentData)

    return currentData
        ? <Loader/>
        : <div className={classes.root}>
            <SearchLine {...props} searchCity={searchCity}/>
            <Card variant="outlined">
                <CardContent className={classes.topCard}>
                    <CardContent className={classes.title}>
                        <Typography className={classes.title} component="h2" color="textSecondary">
                            {currentData.name}
                        </Typography><Typography className={classes.title} component="h2" color="textSecondary">
                        , {currentData.country}
                    </Typography>
                    </CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        sdf
                    </Typography>
                </CardContent>
                <CardContent className={classes.bottomCard}>
                    <CardContent className={classes.title}>
                        <Typography className={classes.temperature}>
                            sdfsdf
                        </Typography>
                        <sup className={classes.temperatureSymbol}>°C</sup>
                    </CardContent>
                    <CardContent className={classes.topCard}>
                        <Typography color="textSecondary" gutterBottom>
                            Wind: sdf m/s
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                            Humidity: sdf %
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                            Pressure: sdf hpa
                        </Typography>
                    </CardContent>
                </CardContent>
            </Card>
        </div>
});

export default Search;
