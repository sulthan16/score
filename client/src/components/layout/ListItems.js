import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    ShoppingCart, Menu, PeopleAlt, Settings, Category
} from '@material-ui/icons';
import { ListItem, ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core';
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
    const { menu } = user || [];

    return (<div>
        {menu.map((value, key) => (
            <React.Fragment key={key}>
                <ListSubheader component="div" id="nested-list-subheader">
                    {value.name}
                </ListSubheader>
                {value.menu.map((item, index) =>
                    (item.menusAccess && <ListItem key={index} button className={classes.gutters} selected={item.path === props.path} onClick={() => history.push(item.path)}>
                        <ListItemIcon>
                            {(item.name === 'cashier' && <ShoppingCart />) ||
                                (item.name === 'product' && <Menu />) || (item.name === 'user' && <PeopleAlt />) ||
                                (item.name === 'roles' && <Settings />) ||
                                (item.name === 'categories' && <Category />)
                            }
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItem>
                    )
                )}

            </React.Fragment>
        ))}
    </div>);
};

export default MainListItems