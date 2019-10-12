
import React from 'react';
import './AllItems.css';
import BaseLayout from 'components/layout';
import {
    Button, Paper, makeStyles, Grid,
    GridList, GridListTile, GridListTileBar, IconButton, Tooltip
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import InputSearch from 'components/inputSearch';
import { confirm } from 'components/confirmationDialog';
import Title from 'components/title';
import productStore from './store';
import { submitForm } from './containers/form';
import { showDetail } from './containers/detail';
const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    header: {
        paddingBottom: theme.spacing(2)
    },
    gridList: {
        width: '100%'
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    }
}));
function AllItems(props) {
    const classes = useStyles();
    const [componentWillMount, setComponentWillMount] = React.useState(false);
    const [productState, productActions] = productStore();

    React.useEffect(() => {
        productActions.get();
    }, [componentWillMount, productActions]);
    const handleProductActions = (value) => {
        if (value) {
            submitForm('Edit Katalog', value).then(
                (onProcess) => {setComponentWillMount(!componentWillMount); },
                (onCancel) => { setComponentWillMount(!componentWillMount); }
            );
        } else {
            submitForm('Tambah Katalog', value).then(
                (onProcess) => { setComponentWillMount(!componentWillMount);  },
                (onCancel) => { setComponentWillMount(!componentWillMount); }
            );
        }
    }
    const handleDetail = (value) => {
        showDetail("Detail Katalog");
    };
    const handleDelete = (value) => {
        confirm("Delete", "Are you sure to Delete ?").then(
            async (onProcess) => {
                await productActions.deleted(value)
                setComponentWillMount(!componentWillMount);
            },
            (onCancel) => {
                setComponentWillMount(!componentWillMount);
            }
        );
    };
    return (
        <BaseLayout>
            <React.Fragment>
                <Grid container className={classes.header}>
                    <Grid item xs={10} direction="row" container justify="flex-start" alignItems="center">
                        <InputSearch placeholder="cari barang" />
                    </Grid>
                    <Grid item xs={2} direction="row" container justify="flex-end" alignItems="center">
                        <Button variant="contained" color="primary" className={classes.button} onClick={() => handleProductActions(null)}>
                            Tambah
                        </Button>
                    </Grid>
                </Grid>
                <Paper className={classes.paper}>
                    <Title>List Barang</Title>
                    <GridList cellHeight={200} className={classes.gridList} cols={3}>
                        {productState.data.map((tile, index) => (
                            <GridListTile key={index}>
                                <img src={tile.thumb} alt={tile.title} className="detail-katalog" onClick={() => { handleDetail(tile) }} />
                                <GridListTileBar
                                    title={tile.title}
                                    subtitle={`stock:${tile.stock} | category: ${tile.categoryTitle}`}
                                    actionIcon={
                                        <React.Fragment>
                                            <Tooltip title="Edit" aria-label="edit">
                                                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon} onClick={() => handleProductActions(tile)}>
                                                    <Edit />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete" aria-label="delete">
                                                <IconButton aria-label={`info about ${tile.title}`} onClick={() => handleDelete(tile)} className={classes.icon}>
                                                    <Delete />
                                                </IconButton>
                                            </Tooltip>
                                        </React.Fragment>
                                    }
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </Paper>
            </React.Fragment>
        </BaseLayout>
    );
}

export default AllItems;
