import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    ShoppingCart, MenuBook, Inbox, ControlCamera,
    ExpandLess, ExpandMore, Category, SettingsApplications, SupervisedUserCircle
} from '@material-ui/icons';
import { Collapse, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
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
    const [open, setOpen] = React.useState(false);
    const [openSettings, setOpenSettings] = React.useState(false);
    const handleClick = () => {
        setOpen(!open);
    }
    const handleClickSettings = () => {
        setOpenSettings(!openSettings);
    }

    return (<div>
        <ListItem button className={classes.gutters} selected={'/cashier' === props.path} onClick={() => history.push('/cashier')}>
            <ListItemIcon>
                <ShoppingCart />
            </ListItemIcon>
            <ListItemText primary="Cashier" />
        </ListItem>
        <ListItem button className={classes.gutters} onClick={handleClick}>
            <ListItemIcon>
                <Inbox />
            </ListItemIcon>
            <ListItemText primary="Barang" />
            {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItem button className={classes.gutters} selected={'/all-items' === props.path}
                    onClick={() => history.push('/all-items')} >
                        <ListItemIcon>
                            <MenuBook />
                        </ListItemIcon>
                        <ListItemText primary="List Barang" />
                </ListItem>
                <ListItem button 
                    onClick={() => history.push('/categories')}
                    className={classes.gutters} selected={'/categories' === props.path}>
                    <ListItemIcon>
                        <Category />
                    </ListItemIcon>
                    <ListItemText primary="Kategori Barang" />
                </ListItem>
            </List>
        </Collapse>

        <ListItem button className={classes.gutters} onClick={handleClickSettings}>
            <ListItemIcon>
                <SettingsApplications />
            </ListItemIcon>
            <ListItemText primary="Pengaturan" />
            {openSettings ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openSettings} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItem button className={classes.gutters}>
                    <ListItemIcon>
                        <SupervisedUserCircle />
                    </ListItemIcon>
                    <ListItemText primary="Pengguna" />
                </ListItem>
                <ListItem button className={classes.gutters}>
                    <ListItemIcon>
                        <ControlCamera />
                    </ListItemIcon>
                    <ListItemText primary="Hak Akses" />
                </ListItem>
            </List>
        </Collapse>
    </div>);
};

export default MainListItems