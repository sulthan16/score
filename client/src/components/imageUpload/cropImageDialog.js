import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogActions, DialogContent, Grid } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import { confirmable, createConfirmation } from "react-confirm";
import ReactCrop from "react-image-crop";
import "./cropImage.css";
import { extractImageFileExtensionFromBase64, image64toCanvasRef, base64StringtoFile } from 'components/utils';


const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

function CropImageDialog(props) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(true);
    const [componentWillMount] = React.useState(false);
    const imagePreviewCanvasRef = React.createRef();
    const [dataImage, setDataImage] = React.useState(null);
    const [src, setSrc] = React.useState(null);
    const [extractImage, setExtractImage] = React.useState(null);
    const [, setFixImage64] = React.useState(null);
    const [crop, setCrop] = React.useState({
        aspect: 1 / 1,
        unit: "%",
        width: 100,
        height: 100
    });
    const { file, cancel, proceed } = props;

    React.useEffect(() => {
        if (file) {
            onSelectFile(file);
        }
    }, [componentWillMount, file]);

    const onSelectFile = file => {
        setDataImage(file.files[0]);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setSrc(reader.result);
            setExtractImage(extractImageFileExtensionFromBase64(reader.result));
        }, false
        );
        reader.readAsDataURL(file.files[0]);

    };

    const onCropComplete = async (crop, pixelCrop) => {
        console.log(crop, pixelCrop);
        const canvasRef = imagePreviewCanvasRef.current;
        const fixedImage = await image64toCanvasRef(canvasRef, src, crop, dataImage.name, extractImage);
        setFixImage64(fixedImage);
    };

    const onCropChange = value => {
        setCrop(value);
    };

    const handleCancel = () => {
        cancel();
        setOpen(false);
    }
    const handleSubmit = () => {
        if (src) {
            const canvasRef = imagePreviewCanvasRef.current

            const imageData64 = canvasRef.toDataURL('image/' + extractImage)

            // file to be uploaded
            const myNewCroppedFile = base64StringtoFile(imageData64, dataImage.name)
            console.log(myNewCroppedFile);
            // download file
            // downloadBase64File(imageData64, dataImage.name);
            proceed(myNewCroppedFile);
        }

    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullScreen
            >
                <AppBar color="default" className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleCancel} aria-label="close">
                            <KeyboardArrowLeft />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Crop Images Features
                        </Typography>
                        <IconButton edge="start" color="inherit" onClick={handleCancel} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <div>maximum resolution image is (640 x 640)px and your image now is
                                <span style={{ color: crop.width >= 640 || crop.height >= 640 ? 'red' : 'green' }}> {`${crop.width} x ${crop.height} px`} </span>
                    </div>
                    <Grid container direction="row"
                        justify="center"
                        alignItems="center">
                        {src && (
                            <ReactCrop
                                src={src}
                                crop={crop}
                                maxWidth={640}
                                maxHeight={640}
                                keepSelection
                                onComplete={onCropComplete}
                                onChange={onCropChange}
                            />
                        )}
                    </Grid>
                    <canvas style={{ display: 'none', }} ref={imagePreviewCanvasRef}></canvas>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={(e) => handleSubmit(e)} color="primary" autoFocus disabled={crop.width >= 640 || crop.height >= 640}>
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}
export function cropDialog(
    file,
    options = {}
) {
    return createConfirmation(confirmable(CropImageDialog))({
        file,
        ...options
    });
}