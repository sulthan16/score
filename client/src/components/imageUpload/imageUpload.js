/**
 *
 * ImageUpload
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Fab, Grid } from '@material-ui/core';
import { Close, CropOriginal } from '@material-ui/icons';
import './index.css';
import { cropDialog } from './cropImageDialog';

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploading: false,
      file: '', imagePreviewUrl: '',
      text: ''
    };

    this.inputRef = React.createRef();

    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.handleClearImage = this.handleClearImage.bind(this);
    this.remove = this.remove.bind(this);
  }
  componentDidMount() {
    if (this.props.imageExist) {
      this.setState({ text: '', imagePreviewUrl: this.props.imageExist })
    }
  }

  fileChangedHandler(event) {
    const { onUpload } = this.props;
    if (event.target.files.length > 0) {
      const file = event.target;
      if (onUpload) {
        this.setState({
          uploading: true,
        });

        if (file.files[0].size <= 571016) {
          cropDialog(file).then(
            (proceed) => {
              onUpload(proceed).then((result) => {
                let reader = new FileReader();
                if (proceed.size <= 571016) {
                  if (result) {
                    reader.onloadend = () => {
                      this.setState({
                        file: proceed,
                        imagePreviewUrl: reader.result,
                        text: '',
                        uploading: false,
                      });
                    }
                    reader.readAsDataURL(proceed)
                  } else {
                    this.setState({
                      text: 'failed to upload',
                      uploading: false,
                      file: '', imagePreviewUrl: ''
                    });
                    this.refs.imageUpload.value = null;
                  }
                } else {
                  this.setState({
                    text: 'max file is 500kb',
                    uploading: false
                  })
                }
              })
            },
            (cancel) => {
              this.setState({
                text: '',
                uploading: false,
                file: '', imagePreviewUrl: ''
              });
              this.refs.imageUpload.value = null;
            }
          )
        } else {
          this.setState({
            text: 'max file is 500kb',
            uploading: false
          })
        }
      }
    }
  }
  remove() {
    this.handleClearImage();
    this.props.onRemove();
  }
  handleClearImage() {
    this.refs.imageUpload.value = null;
    this.setState({ file: '', imagePreviewUrl: '', fileInput: '', text: '' });
  }

  render() {
    const { height, width = '100%' } = this.props;
    let { uploading, imagePreviewUrl, text } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} alt="img-upload" />);
    }
    return (
      <div className="photo-upload" style={{ margin: '5px' }}>
        <div
          className="uploader"
          style={{ height, width }}
          role="presentation"
        >
          <span
            className="upload-instructions"
            style={{ color: '#000000' }}
          >
            {uploading ? 'Uploading...' : (<div><CropOriginal fontSize="large" /><br /><i style={{ fontSize: '11px', color: 'red' }}>{text}</i></div>)}
          </span>
          <input
            className="file-photo"
            id="file"
            name="file"
            onChange={this.fileChangedHandler}
            type="file"
            ref="imageUpload"
            accept="image/x-png,image/gif,image/jpeg"
          />
          {$imagePreview}
          {$imagePreview && (
            <Grid
              style={{ marginTop: '50%', transform: 'translate(0,-50%)' }}
              container
              item
              xs
              direction="row"
              justify="center"
              alignItems="center">

              <Fab color="primary" aria-label="add" onClick={this.remove}>
                <Close />
              </Fab>
            </Grid>
          )}
        </div>
      </div>
    );
  }
}

ImageUpload.propTypes = {
  onUpload: PropTypes.func,
  imageExist: PropTypes.string,
  onRemove: PropTypes.func
};

export default ImageUpload;
