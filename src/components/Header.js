// outsource dependencies
import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

// material ui
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';

// local dependencies
import { ROUTES } from '../constans/routes';


const useStyles = makeStyles(theme =>
    createStyles({
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '10vh',
            marginBottom: 30,
            backgroundColor: 'black',
            padding: 20,
        },
        title: {
            color: '#fff',
            fontSize: '3rem',
        },
    })
);

const Main = memo(() => {
    const classes = useStyles();

    return <header className={classes.header}>
        <NavLink style={{ textDecoration: 'none' }} to={ROUTES.HOME}>
            <Typography className={classes.title} component="h1" > Weather</Typography>
        </NavLink>
    </header>;
});

export default Main;
