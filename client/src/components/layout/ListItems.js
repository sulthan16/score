import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    ShoppingCart, Menu, PeopleAlt, Settings
} from '@material-ui/icons';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import history from 'routes/history';
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    gutters: {
        paddingLeft: "23px !important",
        paddingRight: "23px !important",
    }
}));

function MainListItems(props) {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('user'));
    const { role } = user || [];
    return (<div>
        {role.map((value, key) => (
            <ListItem key={key} button className={classes.gutters} selected={value.Feature.path === props.path} onClick={() => history.push(value.Feature.path)}>
                <ListItemIcon>
                   {(value.Feature.name === 'cashier' && <ShoppingCart /> )||
                   (value.Feature.name === 'product' && <Menu />) ||  (value.Feature.name === 'user' && <PeopleAlt />) || 
                   (value.Feature.name === 'roles' && <Settings />)
                    }
                </ListItemIcon>
                <ListItemText primary={value.Feature.name} />
            </ListItem>
        ))}
    </div>);
};

export default MainListItems