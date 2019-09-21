import React from 'react';
import Select from 'react-select';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
    DropdownIndicator
} from "./container"

const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
    IndicatorSeparator: () => null,
    DropdownIndicator
};


const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            width: '100%'
        },
        input: {
            display: 'flex',
            height: 'auto',
            padding: '14px 14px'
        },
        valueContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            flex: 1,
            alignItems: 'center',
            overflow: 'hidden',
        },
    }),
);

function SelectValidate(props) {
    const classes = useStyles();
    const theme = useTheme();
    const {
        isValid
    } = props;
    const selectStyles = {
        input: (base) => ({
            ...base,
            color: theme.palette.text.primary,
            '& input': {
                font: 'inherit',
            },
        }),
        control: (base, state) => ({
            ...base,
            // state.isFocused can display different borderColor if you need it
            borderColor: state.isFocused ?
                '#ddd' : isValid ?
                    '#ddd' : 'red',
            // overwrittes hover style
            '&:hover': {
                borderColor: state.isFocused ?
                    '#ddd' : isValid ?
                        '#ddd' : 'red'
            }
        })
    };
    return (
        <div className={classes.root}>
            <Select
                {...props}
                error={props.value === null}
                classes={classes}
                styles={selectStyles}
                components={components}
            />
        </div>
    );
}

export default SelectValidate