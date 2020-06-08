// outsource dependencies
import PropTypes from 'prop-types';
import React, { memo } from 'react';

// material ui
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { createStyles, makeStyles } from '@material-ui/core/styles';

// local dependencies


const useStyles = makeStyles(theme =>
    createStyles({
        btn: {
            position: 'fixed',
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

const InfoCard = memo(({ data }) => {
    const classes = useStyles();

    return <>
        <CardContent className={classes.topCard}>
            <CardContent className={classes.vertical}>
                <CardContent className={classes.title}>
                    <Typography className={classes.title} component="h2">
                        {data.name}, {data.country}
                    </Typography>
                </CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {data.timeWeatherReport}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    {data.description}
                </Typography>
            </CardContent>
            <CardContent className={classes.vertical}>
                <Typography color="textSecondary" gutterBottom>
                    time sunrise: {data.timeSunrise}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    time sunset: {data.timeSunset}
                </Typography>
            </CardContent>
        </CardContent>
        <CardContent className={classes.bottomCard}>
            <CardContent className={classes.vertical + classes.padding0}>
                <CardContent className={classes.title}>
                    <Typography className={classes.temperature}>
                        {data.temp}
                    </Typography>
                    <sup className={classes.temperatureSymbol}>°C</sup>
                </CardContent>
                <br/>
                <CardContent style={{ padding: 0 }} className={classes.vertical}>
                    <Typography color="textSecondary" gutterBottom>
                        min. temperature: {data.tempMin}
                        <sup>°C</sup>
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                        min. temperature: {data.tempMax}
                        <sup>°C</sup>
                    </Typography>
                </CardContent>
            </CardContent>
            <CardContent className={classes.infoWeather}>
                <Typography color="textSecondary" gutterBottom>
                    Wind: {data.windSpeed} m/s
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Humidity: {data.humidity} %
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Pressure: {data.pressure} hpa
                </Typography>
            </CardContent>
        </CardContent>
    </>;
});

InfoCard.propTypes = {
    data: PropTypes.object.isRequired,
};

export default InfoCard;
