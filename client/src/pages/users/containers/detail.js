import React from 'react';
import PropTypes from 'prop-types';
import {
    DialogContent
} from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/styles';
// import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import CustomizedDialogs from 'components/formDialog';
// import { confirm } from 'components/confirmationDialog';
import { confirmable, createConfirmation } from "react-confirm";
// import Upload from 'components/imageUpload';
import appStore from 'store/App';

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
    const { data } = props;
    const [openDialog, setOpenDialog] = React.useState(true);
    const [appState, appActions] = appStore();
    const [, setState] = React.useState({
        formData: {
            id: '',
            stok: 0,
            title: '',
            price: '',
            sellPrice: '',
            thumb: [''],
            images: '',
            barcode: '',
            type: '',
            discon: '',
            CategoryId: ''
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
                    thumb: [data.thumb, ''],
                    images: data.images,
                    barcode: data.barcode,
                    type: data.type,
                    discon: data.discon,
                    CategoryId: data.CategoryId,
                }

            })
        }
    }, [componentWillMount, setState, data])


    const handleCloseDialog = () => {
        if (appState.imageUpload) {
            appActions.setImageUpload(['']);
        }
        setOpenDialog(false);
    }

    return (
        <CustomizedDialogs title={props.title} open={openDialog} handleClose={handleCloseDialog}>
            <DialogContent dividers>
                <img src="http://localhost/score/api/uploads/2019-10-10T04.04.14.628Z.jpg" alt="Trulli" width="500" height="333" />
            </DialogContent>
        </CustomizedDialogs>
    )
}

Form.propTypes = {
    width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
    cancel: PropTypes.func,
};
export function showDetail(
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