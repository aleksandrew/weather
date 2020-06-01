// outsource dependencies
import _ from 'lodash';
import GitHubIcon from '@material-ui/icons/GitHub';
import {useDispatch, useSelector} from 'react-redux';
import React, {memo, useState, useCallback, useMemo, useEffect} from 'react';
import {Container} from '@material-ui/core';
import {createStyles, makeStyles} from '@material-ui/core/styles';

// local dependencies
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";


const useStyles = makeStyles(theme =>
    createStyles({
        header: {
            width: '100vw',
            height: '15vh',
            display: 'flex',
            backgroundColor: 'black',
            marginBottom: 30,
        }
    })
);

const Main = memo(() => {
    const classes = useStyles();

    // const {data} = useSelector(selector);

    // const dispatch = useDispatch();
    // const getDataRequest = useCallback(() => dispatch({type: TYPES.GET_DATA}), [dispatch]);
    // const setNewData = useCallback(data => dispatch({type: TYPES.DATA, data}), [dispatch]);
    // const getDataOfCity = useCallback(id => dispatch({type: TYPES.GET_DATA_CITY, id}), [dispatch]);

    return <header className={classes.header}>

    </header>
});

export default Main;
