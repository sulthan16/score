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
            email: '',
            name: '',
            employeeId: '',
            photos: '',
            password: '',
            level: ''
        }
    });
    const [componentWillMount] = React.useState(false);
    React.useEffect(() => {
        categoryActions.get();
        if (data) {
            setState({
                formData: {
                    id: data.id,
                    email: data.email,
                    name: '',
                    employeeId: '',
                    photos: '',
                    password: null,
                    level: data.level
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
                    setState({ formData });
                    await productActions.put(state.formData);
                    handleCloseDialog();
                    proceed();
                } else {
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
        formData['level'] = data;
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
                            <Typography variant="subtitle1" className={classes.header} gutterBottom >Silahkan Isi Data Diri di Bawah ini:</Typography>
                            <Grid container item xs={12}>
                                <Typography variant="subtitle1" className={classes.section} gutterBottom >
                                    Data Pegawai</Typography>
                            </Grid>
                            <Grid container item xs={11}>
                                <TextValidator
                                    id="email"
                                    label="Email"
                                    name="email"
                                    className={classes.textField}
                                    type="email"
                                    margin="normal"
                                    variant="outlined"
                                    value={state.formData.email}
                                    validators={['required', 'isEmail']}
                                    errorMessages={['Email Harus Diisi', 'Email Tidak Valid']}
                                    onChange={handleChange}
                                    autoFocus
                                />
                                <TextValidator
                                    id="name"
                                    label="Nama"
                                    name="name"
                                    className={classes.textField}
                                    type="text"
                                    margin="normal"
                                    variant="outlined"
                                    value={state.formData.name}
                                    validators={['required']}
                                    errorMessages={['Nama Harus Diisi']}
                                    onChange={handleChange}
                                />
                                <TextValidator
                                    id="employeeId"
                                    label="Id Karyawan"
                                    name="employeeId"
                                    className={classes.textField}
                                    type="text"
                                    margin="normal"
                                    variant="outlined"
                                    value={state.formData.employeeId}
                                    validators={['required']}
                                    errorMessages={['Id Karyawan Harus Diisi']}
                                    onChange={handleChange}
                                />
                                <SelectValidate
                                    value={state.formData.level}
                                    id="level"
                                    name="level"
                                    inputId="level"
                                    TextFieldProps={{
                                        label: 'Cari Posisi',
                                        InputLabelProps: {
                                            htmlFor: 'level',
                                            shrink: true,
                                        },
                                    }}
                                    onInputChange={handleInputCategoryChange}
                                    options={getSearchCategory}
                                    onChange={handleChangeCateogry}
                                />
                                <TextValidator
                                    id="password"
                                    label="Password"
                                    name="password"
                                    className={classes.textField}
                                    type="password"
                                    margin="normal"
                                    variant="outlined"
                                    value={state.formData.password}
                                    validators={['required']}
                                    errorMessages={['Password Harus Diisi']}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid container item xs={12}>
                                <Typography variant="subtitle1" className={classes.section} gutterBottom >
                                    Upload Photo Pegawai</Typography>
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
                                                formData['photos'] = data;
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