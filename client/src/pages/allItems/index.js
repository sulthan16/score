
import React from 'react';
import './AllItems.css';
import BaseLayout from 'components/layout';
import {
    Button, Paper, makeStyles, Grid,
    GridList, GridListTile, GridListTileBar, IconButton, Tooltip
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import InputSearch from 'components/inputSearch';
import Title from 'components/title';
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
    const tileData = [
        {
            img: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium//83/MTA-3305242/nike_nike-men-running-runallday-898464-404_full02.jpg',
            title: 'Barang 01',
            stock: '100',
            category: 'Sepatu'
        },
        {
            img: 'https://s3.bukalapak.com/uploads/content_attachment/375ef4a412c99e44323c43b5/w-744/nike-shoes-1.jpg',
            title: 'Barang 02',
            stock: '100',
            category: 'Sepatu'
        },
        {
            img: 'http://www.naturkosmetik-salzburg.at/images/large/products/Nike%20Air%20Huarache%20Ultra%20Herrenschuh%20Anthrazit%20Schwarz%20Wei%20Schwarz%20V67t8411%20493_LRG.jpg',
            title: 'Barang 03',
            stock: '100',
            category: 'Sepatu'
        },
        {
            img: 'https://my-best.id/wp-content/uploads/2018/10/9.-Nike-Air-Zoom-Structure-21-Mens-Running-Shoe-1.jpg',
            title: 'Barang 04',
            stock: '100',
            category: 'Sepatu'
        },
        {
            img: 'https://s4.bukalapak.com/img/9431380012/large/Sepatu_Lari_Nike_Air_Relentless_5_MSL_White_Original_807093_.jpg',
            title: 'Barang 05',
            stock: '100',
            category: 'Sepatu'
        }]
    return (
        <BaseLayout>
            <React.Fragment>
                <Grid container className={classes.header}>
                    <Grid item xs={10} direction="row" container justify="flex-start" alignItems="center">
                        <InputSearch placeholder="cari barang" />
                    </Grid>
                    <Grid item xs={2} direction="row" container justify="flex-end" alignItems="center">
                        <Button variant="contained" color="primary" className={classes.button}>
                            Tambah
                        </Button>
                    </Grid>
                </Grid>
                <Paper className={classes.paper}>
                    <Title>List Barang</Title>
                    <GridList cellHeight={200} className={classes.gridList} cols={3}>
                        {tileData.map((tile, index) => (
                            <GridListTile key={index}>
                                <img src={tile.img} alt={tile.title} />
                                <GridListTileBar
                                    title={tile.title}
                                    subtitle={`stock:${tile.stock} | category: ${tile.category}`}
                                    actionIcon={
                                        <React.Fragment>
                                            <Tooltip title="Edit" aria-label="edit">
                                                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                                                    <Edit />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete" aria-label="delete">
                                                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
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
