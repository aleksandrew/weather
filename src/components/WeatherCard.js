// outsource dependencies
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import React, { memo, useCallback, useState } from 'react';

// material ui
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Slide from '@material-ui/core/Slide';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { createStyles, makeStyles } from '@material-ui/core/styles';

// local dependencies
import { ROUTES } from '../constans/routes';


const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            position: 'relative',
        },
        cardContainer: {
            position: 'relative',
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

const WeatherCard = memo(props => {
    const classes = useStyles();
    const { isListener, id, name, country, windSpeed, humidity, pressure, temp, description, searchCity } = props;

    const [visible, setVisible] = useState({ isVisible: false, id: null });

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

    return <Grid
        item xs={6}
        className={classes.root}
        onMouseLeave={() => isVisibleTitle()}
        onMouseEnter={() => isVisibleTitle(id)}
    >
        <Slide direction="down" in={visible.id === id}>
            <div className={classes.btn}>
                <IconButton
                    color="inherit"
                    aria-label="refresh {name} card"
                    onClick={() => isListener('refresh', id)}
                >
                    <RefreshIcon fontSize="large"/>
                </IconButton>
                <IconButton
                    color="inherit"
                    aria-label="delete {name} card"
                    onClick={() => isListener('delete', id)}
                >
                    <HighlightOffIcon fontSize="large"/>
                </IconButton>
            </div>
        </Slide>

        <NavLink style={{ textDecoration: 'none' }} onClick={() => searchCity(name)} to={`${ROUTES.SEARCH}/${name}`} >
            <Card className={classes.cardContainer} variant="outlined">
                <CardContent className={classes.topCard}>
                    <CardContent className={classes.title}>
                        <Typography className={classes.title} component="h2" color="textSecondary">
                            {name}
                        </Typography><Typography className={classes.title} component="h2" color="textSecondary">
                        , {country}
                        </Typography>
                    </CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        {description}
                    </Typography>
                </CardContent>
                <CardContent className={classes.bottomCard}>
                    <CardContent className={classes.title}>
                        <Typography className={classes.temperature}>
                            {temp}
                        </Typography>
                        <sup className={classes.temperatureSymbol}>°C</sup>
                    </CardContent>
                    <CardContent className={classes.topCard}>
                        <Typography color="textSecondary" gutterBottom>
                            Wind: {windSpeed} m/s
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                            Humidity: {humidity} %
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                            Pressure: {pressure} hpa
                        </Typography>
                    </CardContent>
                </CardContent>
            </Card>
        </NavLink>
    </Grid>;
});

WeatherCard.propTypes = {
    id: PropTypes.number.isRequired,
    temp: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    isListener: PropTypes.func.isRequired,
    humidity: PropTypes.number.isRequired,
    pressure: PropTypes.number.isRequired,
    searchCity: PropTypes.func.isRequired,
    windSpeed: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
};

export default WeatherCard;
