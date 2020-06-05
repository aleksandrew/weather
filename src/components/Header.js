// outsource dependencies
import React, { memo } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

// material ui
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

// local dependencies
import { ROUTES } from '../constans/routes';


const useStyles = makeStyles(theme =>
    createStyles({
        header: {
            display: 'flex',
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
        button: {
            color: '#fff',
            marginRight: '5%',
        },
    })
);

const Header = memo(() => {
    const classes = useStyles();
    const history = useHistory();

    return <header className={classes.header}>
        { !history.location.pathname.includes('home') && <IconButton
            aria-label="go back"
            className={classes.button}
            onClick={() => history.goBack()}
        >
            <KeyboardBackspaceIcon fontSize="large"/>
        </IconButton>
        }
        <NavLink style={{ textDecoration: 'none' }} to={ROUTES.HOME}>
            <Typography className={classes.title} component="h1"> Weather</Typography>
        </NavLink>
    </header>;
});

export default Header;
