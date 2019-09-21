
import React from 'react';
import './Categories.css';
import BaseLayout from 'components/layout';
import {
    Button, Paper, makeStyles, Grid, GridList,
    GridListTile, GridListTileBar, IconButton, Tooltip
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
function Categories(props) {
    const classes = useStyles();
    const tileData = [
        {
            img: 'http://wallpaperping.com/wp-content/uploads/2018/06/cool-diamond.jpg',
            title: 'Image',
            author: 'author'
        },
        {
            img: 'https://visualcocaine.org/public/uploads/large/51550676710r2hbedkbq8lsgdmhbqxg7umbbqkh53wmqzh0xnhknrvzy1u1rjrzig4fvdvs7je93wsmxh5gvwbrwkdupbrfcgbewxjwc1ttr1au.jpg',
            title: 'Image',
            author: 'author'
        },
        {
            img: 'http://wallpaperping.com/wp-content/uploads/2018/06/cool-diamond.jpg',
            title: 'Image',
            author: 'author'
        },
        {
            img: 'http://wallpaperping.com/wp-content/uploads/2018/06/cool-diamond.jpg',
            title: 'Image',
            author: 'author'
        },
        {
            img: 'http://wallpaperping.com/wp-content/uploads/2018/06/cool-diamond.jpg',
            title: 'Image',
            author: 'author'
        }]
    return (
        <BaseLayout>
            <React.Fragment>
                <Grid container className={classes.header}>
                    <Grid item xs={10} direction="row" container justify="flex-start" alignItems="center">
                        <InputSearch placeholder="cari kategori barang" />
                    </Grid>
                    <Grid item xs={2} direction="row" container justify="flex-end" alignItems="center">
                        <Button variant="contained" color="primary" className={classes.button}>
                            Tambah
                        </Button>
                    </Grid>
                </Grid>
                <Paper className={classes.paper}>
                    <Title>Kategori Barang</Title>
                    <GridList cellHeight={200} className={classes.gridList} cols={4}>
                        {tileData.map((tile, index) => (
                            <GridListTile key={index}>
                                <img src={tile.img} alt={tile.title} />
                                <GridListTileBar
                                    title={tile.title}
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

export default Categories;
