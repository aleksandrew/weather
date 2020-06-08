// outsource dependencies
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

// material ui
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { createStyles, makeStyles } from '@material-ui/core/styles';

// local dependencies


const useStyles = makeStyles(theme =>
    createStyles({
        title: {
            margin: 0,
            padding: 0,
            fontSize: '1.5rem',
        },
    })
);

const CustomTooltip = ({ active, payload }) => {
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
        : null;
};

CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.array,
};

CustomTooltip.defaultProps = {
    payload: [],
    active: false,
};

const TempChart = memo(({ matches, data }) => (
    <BarChart
        width={matches ? 500 : 600}
        data={data}
        height={300}
        margin={{
            top: 10, bottom: 10,
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
    matches: PropTypes.bool.isRequired,
};

export default TempChart;
