
import React from 'react';
import clsx from 'clsx';
import './Cashier.css';
import BaseLayout from 'components/layout';
import {
    Paper, makeStyles, Grid, Button, CircularProgress, ListItemSecondaryAction, ListItemText,
    List, ListItem, IconButton
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import ListSubheader from '@material-ui/core/ListSubheader';
import Title from 'components/title';
import productStore from 'pages/allItems/store';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { green, red } from '@material-ui/core/colors';
import SelectValidate from 'components/selectValidate';
import SnackBars from 'components/snackbars';

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: theme.spacing(2)
    },
    control: {
        padding: theme.spacing(2)
    },
    textField: {
        color: '#FFFFFF',
        width: '100%',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    wrapper: {
        margin: theme.spacing(3, 0, 2),
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    buttonError: {
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12
    },
    crot: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
}));
function Cashier(props) {
    const classes = useStyles();
    const [productState, productActions] = productStore();
    const [loading, setLoading] = React.useState(false);
    const [componentWillMount] = React.useState(false);
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [state, setState] = React.useState({
        formData: { jumlah: 1, product: '', barcode: '' }
    });
    const [shoppingCart, setShoppingCart] = React.useState({ product: [] });
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();
    const autoFocus = React.useRef(null);

    React.useEffect(() => {
        productActions.get()
    }, [componentWillMount, productActions]);

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });

    function handleClose() {
        setOpenSnackBar(false);
    }

    const handleChange = (event) => {
        const { formData } = state;
        formData[event.target.name] = event.target.value;
        setState({ formData });
        if (formData['barcode']) {
            formData[event.target.name] = event.target.value;
            handleInputProductChange(event)
        }
    }
    const handleChangeProduct = (data) => {
        const { formData } = state;
        formData['product'] = data;
        setState({ formData });
    }
    const handleInputProductChange = async (event) => {
        if (event.target.value !== '') {
            var query = {
                num: '200',
                cursor: '',
                position: '',
                search: event.target.value
            }
            const res = await productActions.find(query);
            if (res) {
                handleOnSubmit(event, res);
            }
        }
    }
    const handleOnSubmit = (event, res) => {
        event.preventDefault();
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = setTimeout(() => {
                const { formData } = state;
                const { product } = shoppingCart;
                if (res) {
                    res.jumlah = 1;
                    res.total = res.sellPrice;
                    product.push(res);
                    setShoppingCart({
                        product
                    });
                    formData['barcode'] = '';
                    setState({ formData });
                    setSuccess(true);
                    setLoading(false);
                } else {
                    setOpenSnackBar(true);
                    setSuccess(true);
                    setLoading(false);
                }

            }, 1000);
        }

    }
    const formatRupiah = (angka, prefix) => {
        var number_string = angka.toString().replace(/[^,\d]/g, '').toString(),
            split = number_string.split(','),
            sisa = split[0].length % 3,
            rupiah = split[0].substr(0, sisa),
            ribuan = split[0].substr(sisa).match(/\d{3}/gi);

        // tambahkan titik jika yang di input sudah menjadi angka ribuan
        if (ribuan) {
            const separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }

        rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
        return prefix === undefined ? rupiah : (rupiah ? 'Rp.' + rupiah : '');
    }
    const total = () => {
        let total = 0;
        shoppingCart.product.map(product => {
            return total += product.total
        })
        return formatRupiah(total, 'Rp.');
    }
    const deleteCart = (val) => {
        setShoppingCart(oldArray => oldArray.product.filter(item => item.barang.data.id !== val.id))
    }
    const endOftransaction = () => {
        console.log(shoppingCart);
        setShoppingCart({ product: [] });
    }
    // const getSearchProduct = (productState && productState.data.map(product =>
    //     ({ value: product.id, label: product.title, data: product })));

    return (
        <BaseLayout>
            <React.Fragment>
                <SnackBars open={openSnackBar} msg="barang tidak ditemukan" handleClose={handleClose} />
                <Paper className={classes.paper}>
                    <Title>Cashier</Title>
                </Paper>
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={4}>
                        <Paper className={classes.control}>
                            <ValidatorForm
                                className={classes.form}
                                onSubmit={(e) => { handleOnSubmit(e) }}
                            >
                                <TextValidator
                                    id="barcode"
                                    label="Barcode"
                                    name="barcode"
                                    fullWidth
                                    margin="normal"
                                    value={state.formData.barcode}
                                    variant="outlined"
                                    type="text"
                                    onChange={handleChange}
                                    autoFocus
                                />
                                {/* <SelectValidate
                                    value={state.formData.product}
                                    id="findProduct"
                                    name="findProduct"
                                    inputId="findProduct"
                                    validators={['required']}
                                    errorMessages={['Silahkan Isi Katalog Terlebih Dahulu']}
                                    TextFieldProps={{
                                        label: 'Cari Katalog',
                                        InputLabelProps: {
                                            htmlFor: 'findProduct',
                                            shrink: true,
                                        },
                                    }}
                                    onInputChange={handleInputProductChange}
                                    options={getSearchProduct}
                                    onChange={handleChangeProduct}
                                />
                                <TextValidator
                                    id="jumlah"
                                    label="Jumlah"
                                    name="jumlah"
                                    fullWidth
                                    margin="normal"
                                    value={state.formData.jumlah}
                                    variant="outlined"
                                    type="number"
                                    onChange={handleChange}
                                /> */}
                                <div className={classes.wrapper}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        type="submit"
                                        className={buttonClassname}
                                        disabled={loading}
                                    >
                                        {loading ? (<span><CircularProgress size={24} className={classes.buttonProgress} /> Tunggu</span>) : 'Tambahkan ke Keranjang'}
                                    </Button>
                                </div>
                            </ValidatorForm>
                        </Paper>
                    </Grid>
                    {shoppingCart.product.length > 0 && (<Grid item xs={8}>
                        <Paper>
                            <List className={classes.crot} subheader={<li />}>
                                <li className={classes.listSection}>
                                    <ul className={classes.ul}>
                                        <ListSubheader>{`Isi Keranjang Belanja ${shoppingCart.product.length}`}</ListSubheader>
                                        {shoppingCart.product.map((item, key) => (
                                            <ListItem key={`item-${key}`}>
                                                <ListItemText
                                                    primary={`${item.title}`}
                                                    secondary={`jumlah:${item.jumlah} | harga:${formatRupiah(item.total, 'Rp. ')}`}
                                                />
                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" aria-label="delete" onClick={() => deleteCart(item.barang.data)}>
                                                        <Delete />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        ))}
                                    </ul>
                                </li>
                            </List>
                            <List className={classes.crot} subheader={<li />}>
                                <li className={classes.listSection}>
                                    <ul className={classes.ul}>
                                        <ListSubheader>{`Total ${total()}`}</ListSubheader>
                                    </ul>
                                </li>
                            </List>
                            <Grid container item xs justify="flex-end" alignItems="flex-end" style={{ padding: 5 }}>
                                <Button variant="contained" type="button" onClick={endOftransaction}
                                    color="primary">Selesaikan Pembayaran</Button>
                            </Grid>
                        </Paper>
                    </Grid>)}
                </Grid>
            </React.Fragment>
        </BaseLayout >
    );
}

export default Cashier;
