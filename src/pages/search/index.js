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

    const dispatch = useDispatch();
    // const getDataRequest = useCallback(() => dispatch({type: TYPES.GET_DATA}), [dispatch]);
    // const setNewData = useCallback(data => dispatch({type: TYPES.DATA, data}), [dispatch]);
    // const getDataOfCity = useCallback(id => dispatch({type: TYPES.GET_DATA_CITY, id}), [dispatch]);
    const searchCity = useCallback(str => dispatch({type: TYPES.SEARCH_CITY, str}), [dispatch]);

    useEffect(() => {
    }, []);

    const setSearch = useCallback(str => {
    }, []);

    // const currentData = useMemo(() =>
    //     data && _.map(data, (item) => ({
    //         id: item.id,
    //         name: item.name,
    //         country: item.sys.country,
    //         windSpeed: item.wind.speed,
    //         humidity: item.main.humidity,
    //         pressure: item.main.pressure,
    //         temp: Math.round(item.main.temp),
    //         description: item.weather[0].description,
    //     })), [data]);

    return (
        <div className={classes.root}>
            <SearchLine {...props} searchCity={searchCity} />
                <Card variant="outlined">
                    <CardContent className={classes.topCard}>
                        <CardContent className={classes.title}>
                            <Typography className={classes.title} component="h2" color="textSecondary">
                                sdfdsf
                            </Typography><Typography className={classes.title} component="h2" color="textSecondary">
                            , sdfsdf
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
    );
});

export default Search;
