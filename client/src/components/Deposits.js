/* eslint-disable no-script-url */

import React from 'react';
import { Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './title';

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function Deposits() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>Recent Deposits</Title>
            <Typography component="p" variant="h4">
                $3,024.00
      </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                on 15 March, 2019
      </Typography>
            <div>
                <Route color="primary" to="/">
                    View balance
        </Route>
            </div>
        </React.Fragment>
    );
}