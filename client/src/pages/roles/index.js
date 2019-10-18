
import React from 'react';
import './Roles.css';
import BaseLayout from 'components/layout';
import {
    Button, makeStyles, Grid
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import productStore from './store';
import { submitForm } from './containers/form';
// import { showDetail } from './containers/detail';
import Table from './containers/table';

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
    const [state,] = React.useState({
        columns: [
            { title: 'Name', field: 'title' }
        ]
    });

    React.useEffect(() => {
        productActions.get();
    }, [componentWillMount, productActions]);

    const handleProductActions = (value) => {
        if (value) {
            submitForm('Edit Katalog', value).then(
                (onProcess) => { setComponentWillMount(!componentWillMount); },
                (onCancel) => { setComponentWillMount(!componentWillMount); }
            );
        } else {
            submitForm('Tambah Katalog', value).then(
                (onProcess) => { setComponentWillMount(!componentWillMount); },
                (onCancel) => { setComponentWillMount(!componentWillMount); }
            );
        }
    }
    // const handleDetail = (value) => {
    //     showDetail("Detail Katalog");
    // };
    
    return (
        <BaseLayout>
            <React.Fragment>
                <Grid container className={classes.header}>
                    <Grid item xs='auto' direction="row" container justify="flex-end" alignItems="center">
                        <Button variant="contained" color="primary" className={classes.button} onClick={() => handleProductActions(null)}>
                            Tambah
                        </Button>
                    </Grid>
                </Grid>
                <Grid>
                    <Table
                        title="Roles Management"
                        columns={state.columns}
                        data={productState.data}
                        editable={{
                            onRowDelete: oldData =>
                                new Promise(resolve => {
                                    setTimeout(async () => {
                                        resolve();
                                        await productActions.deleted(oldData)
                                        setComponentWillMount(!componentWillMount);
                                    }, 600);
                                }),
                        }}
                        actions={[
                            {
                                icon: Edit,
                                tooltip: 'Update Role',
                                onClick: (event, rowData) => {
                                    handleProductActions(rowData);
                                }
                            }
                        ]}
                    />
                </Grid>
            </React.Fragment>
        </BaseLayout>
    );
}

export default AllItems;
