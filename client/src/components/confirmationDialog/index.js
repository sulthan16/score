import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { confirmable, createConfirmation } from "react-confirm";

function AlertDialog(props) {
    const [open, setOpen] = React.useState(true);
    const { title, content, proceed } = props;

    function handleClose() {
        setOpen(false);
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={proceed} color="primary" autoFocus>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export function confirm(
    title,
    content,
    options = {}
) {
    return createConfirmation(confirmable(AlertDialog))({
        title,
        content,
        ...options
    });
}