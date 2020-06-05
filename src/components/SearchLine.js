// outsource dependencies
import PropTypes from 'prop-types';
import React, { memo, useCallback, useEffect, useState } from 'react';

// material ui
import SearchIcon from '@material-ui/icons/Search';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { createStyles, makeStyles } from '@material-ui/core/styles';


// local dependencies
import { ROUTES } from '../constans/routes';


const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            marginBottom: 30,
        },
        margin: {
            margin: theme.spacing(1),
        },
        withoutLabel: {
            marginTop: theme.spacing(3),
        },
        textField: {
            width: '25ch',
        },
        iconButton: {
            padding: 10,
        },
    })
);

const SearchLine = memo(({ location, history, searchCity, inputData }) => {
    const classes = useStyles();
    const [values, setValues] = useState('');

    const handleChange = useCallback((prop) => (event) => {
        setValues(event.target.value);
    }, []);

    useEffect(() => {
        !values && setValues(inputData);
    }, [inputData, values]);

    const onSearch = useCallback(() => (e) => {
        if (values) {
            searchCity(values);

            if (location.pathname !== ROUTES.SEARCH) {
                history.push(ROUTES.SEARCH);
            }
        }
    }, [values, searchCity, location.pathname, history]);

    return <div className={classes.root}>
        <FormControl fullWidth className={classes.margin} variant="outlined">
            <InputLabel htmlFor="search-city">Search </InputLabel>
            <OutlinedInput
                labelWidth={60}
                id="search-city"
                onChange={handleChange('search')}
                endAdornment={
                    <IconButton
                        type="button"
                        aria-label="search"
                        onClick={onSearch()}
                        className={classes.iconButton}
                    >
                        <SearchIcon />
                    </IconButton>
                }
            />
        </FormControl>
    </div>;
});

SearchLine.propTypes = {
    inputData: PropTypes.string,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    searchCity: PropTypes.func.isRequired,
};

SearchLine.defaultProps = {
    inputData: '',
};

export default SearchLine;
