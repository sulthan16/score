import React from 'react';
import PropTypes from 'prop-types';
import {
    Button, DialogContent, DialogActions, Grid, Typography
} from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import CustomizedDialogs from 'components/formDialog';
import { confirm } from 'components/confirmationDialog';
import { confirmable, createConfirmation } from "react-confirm";
import Upload from 'components/imageUpload';

const styles = theme => ({
    header: {
        textAlign: 'center'
    },
    textField: {
        color: '#FFFFFF',
        width: '100%',
    },
    section: {
        color: '#8a8888',
        width: '100%',
        background: '#c1c1c1',
        padding: '5px'
    }
});

function Form(props) {
    const { classes, width, data, cancel } = props;
    const [openDialog, setOpenDialog] = React.useState(true);
    const [state, setState] = React.useState({
        formData: {
            id: '',
            stok: 0,
            title: '',
            price: 0,
            sellPrice: 0,
            thumb: [],
            images: ''
        }
    });
    const [componentWillMount] = React.useState(false);
    React.useEffect(() => {
        if (data) {
            setState({
                formData: {
                    id: data.id,
                    title: data.title,
                    stock: data.stock,
                    price: data.price,
                    sellPrice: data.sellPrice,
                    thumb: [data.thumb,''],
                    images: data.images
                }
            })
        }
    }, [componentWillMount, setState, data])


    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const handleChange = (event) => {
        const { formData } = state;
        formData[event.target.name] = event.target.value;
        setState({ formData });
    }

    const handleSubmit = (event) => {
        // var query = {
        //     num: 10,
        //     cursor: '',
        //     position: ''
        // }
        confirm("Submit", "Are you sure to Submit ?").then(
            (onProcess) => {
                // facilityActions.onUpdateFacility(state.formData, query);
                handleCloseDialog();
                cancel();
            }
        );
    }

    return (
        <CustomizedDialogs title={props.title} open={openDialog} handleClose={handleCloseDialog}>
            <DialogContent dividers>
                <ValidatorForm id="myform" onSubmit={(e) => { handleSubmit(e) }}>
                    <Grid container justify="center">
                        <Grid container justify="center" item xs={width === 'lg' ? 8 : 12}>
                            <Typography variant="subtitle1" className={classes.header} gutterBottom >Silahkan Isi Data Katalog di Bawah ini:</Typography>
                            <Grid container item xs={12}>
                                <Typography variant="subtitle1" className={classes.section} gutterBottom >
                                    Nama Barang & Stok</Typography>
                            </Grid>
                            <Grid container item xs={11}>
                                <TextValidator
                                    id="title"
                                    label="Nama Barang"
                                    name="title"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    value={state.formData.title}
                                    validators={['required']}
                                    errorMessages={['Nama Barang Harus Di isi']}
                                    onChange={handleChange}
                                    autoFocus
                                />
                                <TextValidator
                                    id="stock"
                                    label="Stok Barang"
                                    name="stock"
                                    className={classes.textField}
                                    margin="normal"
                                    type="number"
                                    value={state.formData.stock}
                                    variant="outlined"
                                    validators={['required']}
                                    errorMessages={['Stok Barang Harus Di isi']}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Grid>
                            <Grid container item xs={12}>
                                <Typography variant="subtitle1" className={classes.section} gutterBottom >
                                    Harga Modal , Harga Jual & Diskon</Typography>
                            </Grid>
                            <Grid container item xs={11} style={{ paddingBottom: 30 }}>
                                <TextValidator
                                    id="price"
                                    label="Harga Modal"
                                    name="price"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    type="number"
                                    value={state.formData.price}
                                    validators={['required']}
                                    errorMessages={['Harga Modal Harus Di Isi']}
                                    onChange={handleChange}
                                    autoFocus
                                />
                                <TextValidator
                                    id="sellPrice"
                                    label="Harga Jual"
                                    name="sellPrice"
                                    className={classes.textField}
                                    margin="normal"
                                    type="sellPrice"
                                    value={state.formData.sellPrice}
                                    variant="outlined"
                                    validators={['required']}
                                    errorMessages={['Harga Jual Harus di Isi']}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Grid>
                            <Grid container item xs={12}>
                                <Typography variant="subtitle1" className={classes.section} gutterBottom >
                                    Upload Gambar</Typography>
                            </Grid>
                            <Grid container justify="center" item xs={11} style={{ paddingBottom: 30 }}>
                                <Upload inputValue={state.formData.thumb} />
                            </Grid>
                        </Grid>
                    </Grid>
                </ValidatorForm>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { handleCloseDialog(); }} color="primary">
                    Cancel
                        </Button>
                <Button type="submit" form="myform" variant="contained" style={{ marginRight: 30 }} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </CustomizedDialogs>
    )
}

Form.propTypes = {
    width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
    cancel: PropTypes.func,
};
export function submitForm(
    title,
    data,
    options = {}
) {
    return createConfirmation(confirmable(withStyles(styles)(withWidth()(Form))))({
        title,
        data,
        ...options
    });
}