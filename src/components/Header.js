// outsource dependencies
import React, {memo} from 'react';
import Typography from "@material-ui/core/Typography";
import {createStyles, makeStyles} from '@material-ui/core/styles';

// local dependencies


const useStyles = makeStyles(theme =>
    createStyles({
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '15vh',
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
        <Typography className={classes.title} component="h1" > Weather</Typography>
    </header>
});

export default Main;
