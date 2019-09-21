import React from 'react';
import PropTypes from 'prop-types';
import inputComponent from './inputComponent';
import { TextValidator } from 'react-material-ui-form-validator';

function Control(props) {
    const {
        children,
        innerProps,
        innerRef,
        selectProps: { classes, TextFieldProps, validators, errorMessages, value },
    } = props;
    return (
        <div>
            <TextValidator
                fullWidth
                margin="normal"
                variant="outlined"
                label={TextFieldProps.label}
                InputProps={{
                    inputComponent,
                    inputProps: {
                        className: classes.input,
                        ref: innerRef,
                        children,
                        ...innerProps,
                    },
                }}
                value={value}
                validators={validators ? [validators] : []}
                errorMessages={errorMessages ? [errorMessages] : ''}
            />
        </div>
    );
}

Control.propTypes = {
    children: PropTypes.node
};

export default Control