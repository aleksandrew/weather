// outsource dependencies
import _ from 'lodash';
import GitHubIcon from '@material-ui/icons/GitHub';
import {useDispatch, useSelector} from 'react-redux';
import React, {memo, useState, useCallback, useMemo, useEffect} from 'react';
import {
    Button,
    Container,
    GridList,
    Card,
    GridListTileBar,
    IconButton,
    ListSubheader,
    Slide,
} from '@material-ui/core';
import {Theme, createStyles, makeStyles} from '@material-ui/core/styles';

// local dependencies
import {selector} from './reducer';
import {TYPES} from "./types";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import WeatherCard from "../../components/WeatherCard";


const toCelsius = K => Math.round(3.5 + K - 273.15);

const useStyles = makeStyles(theme =>
    createStyles({
        cardContainer: {
            display: 'flex',
            flexDirection: 'column',
            minWidth: 275,
        },
        topCard: {
            display: 'flex',
            flexDirection: 'column',
        },
        title: {
            display: 'flex',
            flexDirection: 'row',
            padding: 0,
            fontSize: '1.8rem',
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
            padding: '20px 0',
            borderRadius: 0,
        },
        temperature: {
            fontSize: '4rem',
        },
        temperatureSymbol: {
            fontSize: '1.7rem',
        },

        btn: {
            position: 'fixed',
            top: 10,
            right: 0,
            display: 'block',
            backgroundColor: '#000',
            zIndex: 2,
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        pos: {
            marginBottom: 12,
        },
    })
);

const Main = memo(() => {
    const classes = useStyles();

    const {data} = useSelector(selector);

    const dispatch = useDispatch();
    const getDataRequest = useCallback(() => dispatch({type: TYPES.GET_DATA}), [dispatch]);
    const setNewData = useCallback(data => dispatch({type: TYPES.DATA, data}), [dispatch]);

    useEffect(() => {
        !data && getDataRequest();
    }, [data, getDataRequest]);

    const isDelete = useCallback(id => {
        let newData = data;
        newData = _.filter(newData, item => id !== item.id)

        setNewData(newData)
    }, [data, setNewData]);

    const currentData = useMemo(() =>
        data && _.map(data, (item) => ({
            id: item.id,
            name: item.name,
            country: item.sys.country,
            windSpeed: item.wind.speed,
            humidity: item.main.humidity,
            pressure: item.main.pressure,
            temp: toCelsius(item.main.temp),
            description: item.weather[0].description,
        })), [data]);

    return (
        <Container>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    {_.map(currentData, (tile) =>
                        <WeatherCard isDelete={isDelete} key={tile.id} {...tile} />
                    )}
                </Grid>
            </div>
        </Container>
    );
});

export default Main;
