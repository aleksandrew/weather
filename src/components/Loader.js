// outsource dependencies
import React, { useState, useEffect } from 'react';

// material ui
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles } from '@material-ui/core/styles';

// local dependencies


const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh',
        },
    })
);

export default function Loader () {
    const classes = useStyles();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        function tick () {
            // reset when reaching 100%
            setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 1));
        }

        const timer = setInterval(tick, 20);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className={classes.root}>
            <CircularProgress size="20vw" variant="determinate" value={progress} color="secondary" />
        </div>
    );
}
