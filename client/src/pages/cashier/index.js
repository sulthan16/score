
import React from 'react';
import './Cashier.css';
import BaseLayout from 'components/layout';
import { Paper, makeStyles } from '@material-ui/core';
import Title from 'components/title';
const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    }
}));
function Cashier(props) {
    const classes = useStyles();
    return (
        <BaseLayout>
            <React.Fragment>
                <Paper className={classes.paper}>
                    <Title>Cashier</Title>
                </Paper>
            </React.Fragment>
        </BaseLayout>
    );
}

export default Cashier;
