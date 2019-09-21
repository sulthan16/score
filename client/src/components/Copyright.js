import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Route } from 'react-router-dom';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Route color="inherit" to="https://material-ui.com/">
                Your Website
            </Route>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
export default Copyright