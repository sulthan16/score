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
import SingleUpload from 'components/imageUpload/imageUpload';
import appStore from 'store/App';
import categoryStore from '../store';
import AppService from 'services/app';

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
    const [, categoryActions] = categoryStore();
    const [state, setState] = React.useState({
        formData: {
            id: '',
            title: '',
            thumb: '',
        }
    });
    const [componentWillMount] = React.useState(false);
    React.useEffect(() => {
        if (data) {
            setState({
                formData: {
                    id: data.id,
                    title: data.title,
                    thumb: data.thumb
                }
            })
        }
    }, [componentWillMount, setState, data])

    const removeImageUpload = (value) => {
        const { formData } = state;
        formData['thumb'] = '';
        setState({ formData });
    }

    const handleCloseDialog = () => {
        if (appState.imageUpload) {
            appActions.setImageUpload(['']);
        }
        setOpenDialog(false);
    }

    const handleChange = (event) => {
        const { formData } = state;
        formData[event.target.name] = event.target.value;
        setState({ formData });
    }

    const handleSubmit = (event) => {
        confirm("Submit", "Are you sure to Submit ?").then(
            (onProcess) => {
                if (data) {
                    categoryActions.put(state.formData);
                    handleCloseDialog();
                    proceed();
                } else {
                    categoryActions.store(state.formData);
                    handleCloseDialog();
                    proceed();
                }
            }
        );
    }

    return (
        <CustomizedDialogs title={props.title} open={openDialog} handleClose={handleCloseDialog}>
            <DialogContent dividers>
                <ValidatorForm id="myform" onSubmit={(e) => { handleSubmit(e) }}>
                    <Grid container justify="center">
                        <Grid container justify="center" item xs={width === 'lg' ? 8 : 12}>
                            <Typography variant="subtitle1" className={classes.header} gutterBottom >Silahkan Isi Data Kategori Barang di Bawah ini:</Typography>
                            <Grid container item xs={12}>
                                <Typography variant="subtitle1" className={classes.section} gutterBottom >
                                    Nama Kategori Barang</Typography>
                            </Grid>
                            <Grid container item xs={11}>
                                <TextValidator
                                    id="title"
                                    label="Nama Kategori Barang"
                                    name="title"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    value={state.formData.title}
                                    validators={['required']}
                                    errorMessages={['Nama Kategori Barang Harus Di isi']}
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </Grid>
                            <Grid container item xs={12}>
                                <Typography variant="subtitle1" className={classes.section} gutterBottom >
                                    Gambar</Typography>
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