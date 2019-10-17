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
import SingleUpload from 'components/imageUpload/imageUpload';
import appStore from 'store/App';
import productStore from '../store';
import categoryStore from 'pages/categories/store';
import AppService from 'services/app';
import SelectValidate from 'components/selectValidate';

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
    const { classes, width, data, proceed } = props;
    const [openDialog, setOpenDialog] = React.useState(true);
    const [appState, appActions] = appStore();
    const [, productActions] = productStore();
    const [categoryState, categoryActions] = categoryStore();
    const [state, setState] = React.useState({
        formData: {
            id: '',
            stok: 0,
            title: '',
            price: '',
            sellPrice: '',
            thumb: '',
            images: '',
            barcode: '',
            type: '',
            discon: '',
            CategoryId: ''
        }
    });
    const [componentWillMount] = React.useState(false);
    React.useEffect(() => {
        categoryActions.get();
        if (data) {
            setState({
                formData: {
                    id: data.id,
                    title: data.title,
                    stock: data.stock,
                    price: data.price,
                    sellPrice: data.sellPrice,
                    thumb: data.thumb,
                    // images: JSON.parse(data.images),
                    barcode: data.barcode,
                    type: data.type,
                    discon: data.discon,
                    CategoryId: {
                        value: data.CategoryId, label: data.categoryTitle, data: {
                            id: data.CategoryId, title: data.categoryTitle
                        }
                    }
                }
            })
        }
    }, [componentWillMount, setState, data, categoryActions])


    const handleCloseDialog = () => {
        if (appState.imageUpload) {
            appActions.setImageUpload(['']);
        }
        setOpenDialog(false);
    }
    const removeImageUpload = (value) => {
        const { formData } = state;
        formData['thumb'] = '';
        setState({ formData });
    }

    const handleChange = (event) => {
        const { formData } = state;
        formData[event.target.name] = event.target.value;
        setState({ formData });
    }

    const handleSubmit = (event) => {
        const { formData } = state;
        confirm("Submit", "Are you sure to Submit ?").then(
            async (onProcess) => {
                if (data) {
                    formData['images'] = appState.imageUpload;
                    setState({ formData });
                    await productActions.put(state.formData);
                    handleCloseDialog();
                    proceed();
                } else {
                    formData['images'] = appState.imageUpload;
                    setState({ formData });
                    await productActions.store(state.formData);
                    handleCloseDialog();
                    proceed();
                }
            }
        );
    }
    const handleInputCategoryChange = (value) => {
        if (value !== '') {
            var query = {
                num: '200',
                cursor: '',
                position: '',
                search: value
            }
            categoryActions.get(query);
        }
        return value
    }

    const handleChangeCateogry = (data) => {
        const { formData } = state;
        formData['CategoryId'] = data;
        setState({ formData });
    }
    const getSearchCategory = (categoryState && categoryState.data.map(category =>
        ({ value: category.id, label: category.title, data: category })));
    return (
        <CustomizedDialogs title={props.title} open={openDialog} handleClose={handleCloseDialog}>
            <DialogContent dividers>
                <ValidatorForm id="myform" encType="multipart/form-data" onSubmit={(e) => { handleSubmit(e) }}>
                    <Grid container justify="center">
                        <Grid container justify="center" item xs={width === 'lg' ? 8 : 12}>
                            <Typography variant="subtitle1" className={classes.header} gutterBottom >Silahkan Isi Data Katalog di Bawah ini:</Typography>
                            <Grid container item xs={12}>
                                <Typography variant="subtitle1" className={classes.section} gutterBottom >
                                    Nama Barang ,Category & Stok</Typography>
                            </Grid>
                            <Grid container item xs={11}>
                                <TextValidator
                                    id="barcode"
                                    label="Barcode"
                                    name="barcode"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    value={state.formData.barcode}
                                    validators={['required']}
                                    errorMessages={['Barcode Barang Harus Di isi']}
                                    onChange={handleChange}
                                    autoFocus
                                />
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
                                <SelectValidate
                                    value={state.formData.CategoryId}
                                    id="category"
                                    name="category"
                                    inputId="categoryId"
                                    TextFieldProps={{
                                        label: 'Cari Kategori',
                                        InputLabelProps: {
                                            htmlFor: 'category',
                                            shrink: true,
                                        },
                                    }}
                                    onInputChange={handleInputCategoryChange}
                                    options={getSearchCategory}
                                    onChange={handleChangeCateogry}
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
                                <Upload inputValue={state.formData.images} />
                            </Grid>
                            <Grid container item xs={12}>
                                <Typography variant="subtitle1" className={classes.section} gutterBottom >
                                    Upload Thumbnail</Typography>
                            </Grid>
                            <Grid container justify="center" item xs={11} style={{ paddingBottom: 30 }}>
                                <SingleUpload
                                    onUpload={(file) => {
                                        const form = new FormData();
                                        form.append('file', file);
                                        return new Promise(resolve => {
                                            AppService.uploadImage(form).then(response => {
                                                let data = response.data.result;
                                                const { formData } = state;
                                                formData['thumb'] = data;
                                                setState({ formData });
                                                resolve(true);
                                            }).catch(error => {
                                                console.log(error);
                                                resolve(false);
                                            });
                                        });
                                    }}
                                    imageExist={state.formData.thumb}
                                    onRemove={(value) => removeImageUpload(value)}
                                />
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