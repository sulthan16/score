import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

export default function TransitionsSnackbar(props) {
    const { msg } = props;
    const [state, ] = React.useState({
        Transition: Slide,
    });

    return (

        <div>
            <Snackbar
                open={props.open}
                onClose={props.handleClose}
                TransitionComponent={state.Transition}
                message={msg}
                autoHideDuration={1000}
            />
        </div >
    );
}