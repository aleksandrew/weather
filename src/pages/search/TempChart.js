// outsource dependencies
import _ from 'lodash';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import React, {memo, useCallback, useMemo, useEffect, useState} from 'react';

// material ui
import Card from '@material-ui/core/Card';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

// local dependencies
import {TYPES} from './types';
import Loader from '../../components/Loader';
import {TYPES as HOMETYPES} from '../home/types';
import SearchLine from '../../components/SearchLine';
import {selector as searchSelector} from './reducer';
import {parseOfUnixTimestap} from '../../services/date';
import {selector as homeSelector} from '../home/reducer';
import {setToLocalStorage} from '../../services/storage';
import Layout from '../../components/Layout';
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";


const useStyles = makeStyles(theme =>
    createStyles({
        title: {
            margin: 0,
            padding: 0,
            fontSize: '1.5rem',
        },
    })
);

const CustomTooltip = ({active, payload}) => {
    const classes = useStyles();

    return active
        ? <Card variant="outlined">
            <CardContent>
                <Typography className={classes.title} component="h3">{payload[0].payload.weather}</Typography>
                <Typography>{payload[0].payload.fullTime}</Typography>
                <Typography>{payload[0].payload.time}</Typography>
                <Typography>Temperature: {payload[0].payload.temperature}°C</Typography>
                <Typography>Wind: {payload[0].payload.windSpeed} m/s</Typography>
                <Typography>Humidity: {payload[0].payload.humidity} %</Typography>
                <Typography>Pressure: {payload[0].payload.pressure} hpa</Typography>
            </CardContent>
        </Card>
        : null
}

const TempChart = memo(({data}) => (
    <BarChart
        width={1000}
        data={data}
        height={300}
        margin={{
            top: 20, bottom: 20,
        }}
    >
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="time"/>
        <YAxis/>
        <Tooltip content={<CustomTooltip/>}/>
        <Legend/>
        <Bar dataKey="temperature" barSize={20} fill="#1c42b5"/>

    </BarChart>
));

TempChart.propTypes = {
    data: PropTypes.array.isRequired,
};

export default TempChart;
