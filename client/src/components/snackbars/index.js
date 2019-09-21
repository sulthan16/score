import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

export default function TransitionsSnackbar(props) {
    const { msg } = props;
    const [state, setState] = React.useState({
        open: true,
        Transition: Slide,
    });

    function handleClose() {
        setState({
            ...state,
            open: false,
        });
    }

    return (

        <div>
            <Snackbar
                open={state.open}
                onClose={handleClose}
                TransitionComponent={state.Transition}
                message={msg}
                autoHideDuration={3000}
            />
        </div >
    );
}