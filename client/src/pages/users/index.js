
import React from 'react';
import './Users.css';
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
function User(props) {
    const classes = useStyles();
    const { params } = props;
    const [componentWillMount, setComponentWillMount] = React.useState(false);
    const [productState, productActions] = productStore();
    const [state,] = React.useState({
        columns: [
            { title: 'Email', field: 'email' },
            { title: 'Level', field: 'Role.name' },
            { title: 'Company', field: 'Company.name' }
        ]
    });

    React.useEffect(() => {
        productActions.get();
    }, [componentWillMount, productActions]);

    const handleProductActions = (value) => {
        if (value) {
            submitForm('Edit User', value).then(
                (onProcess) => { setComponentWillMount(!componentWillMount); },
                (onCancel) => { setComponentWillMount(!componentWillMount); }
            );
        } else {
            submitForm('Tambah User', value).then(
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
                        {params.create && (<Button variant="contained" color="primary" className={classes.button} onClick={() => handleProductActions(null)}>
                            Tambah
                        </Button>)}
                    </Grid>
                </Grid>
                <Grid>
                    <Table
                        title="Users Management"
                        columns={state.columns}
                        data={productState.data}
                        editable={params.delete ? {
                            onRowDelete: oldData =>
                                new Promise(resolve => {
                                    setTimeout(async () => {
                                        resolve();
                                        await productActions.deleted(oldData)
                                        setComponentWillMount(!componentWillMount);
                                    }, 600);
                                }),
                        } : false}
                        actions={params.put ? [
                            {
                                icon: Edit,
                                tooltip: 'Update',
                                onClick: (event, rowData) => {
                                    handleProductActions(rowData);
                                }
                            }
                        ] : false}
                    />
                </Grid>
            </React.Fragment>
        </BaseLayout>
    );
}

export default User;
