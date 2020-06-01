// outsource dependencies
import React, {memo } from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';

// local dependencies
import SearchIcon from '@material-ui/icons/Search';
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";


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

const SearchLine = memo(() => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    return <div className={classes.root}>
        <FormControl fullWidth className={classes.margin} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Search </InputLabel>
            <OutlinedInput
                id="outlined-adornment-amount"
                value={values.amount}
                onChange={handleChange('amount')}
                endAdornment={
                    <IconButton type="button" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                }
                labelWidth={60}
            />
        </FormControl>
    </div>
});

export default SearchLine;
