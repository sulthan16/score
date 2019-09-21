import React from "react";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ValidatorComponent } from "react-material-ui-form-validator";
import DateFnsUtils from '@date-io/date-fns';
class Picker extends ValidatorComponent {
    render() {
        const {
            errorMessages,
            validators,
            requiredError,
            helperText,
            validatorListener,
            ...rest
        } = this.props;
        const { isValid } = this.state;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div>
                    <KeyboardDatePicker
                        {...rest}
                        error={!isValid}
                        helperText={(!isValid && this.getErrorMessage()) || helperText}
                    />
                </div>
            </MuiPickersUtilsProvider>
        );
    }
}

export default Picker;