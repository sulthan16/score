import React from 'react';
import ImageUpload from './imageUpload';
import appStore from 'store/App';
import AppService from 'services/app';

function Upload(props) {
    const [appState, appAction] = appStore();
    const [componentDidMount, setComponentDidMount] = React.useState(false);

    const removeImageUpload = (value) => {
        let index = appState.imageUpload.indexOf(value);
        if (index > -1) {
            appState.imageUpload.splice(index, 1);
        }
        appAction.setImageUpload(appState.imageUpload);
    }

    if (!componentDidMount && props.inputValue) {
        appAction.setImageUpload(props.inputValue);
        setComponentDidMount(true);
    }

    const renderUploadImage = () => {
        return (<React.Fragment>
            {appState.imageUpload.map((value, index) => (
                <div key={index}>
                    <ImageUpload
                        key={index}
                        onUpload={(file) => {
                            const form = new FormData();
                            form.append('file', file);
                            return new Promise(resolve => {
                                AppService.uploadImage(form).then(response => {
                                    let data = response.data.result;

                                    if (appState.imageUpload.length) {
                                        appState.imageUpload.map((value, key) => {
                                            if (value === '') {
                                                appState.imageUpload[key] = data
                                            }
                                            return appState.imageUpload
                                        })
                                    }
                                    if (appState.imageUpload.length <= 4) {
                                        appState.imageUpload.push('');
                                    }
                                    appAction.setImageUpload(appState.imageUpload);
                                    resolve(true);
                                }).catch(error => {
                                    console.log(error);
                                    resolve(false);
                                });
                            });
                        }}
                        imageExist={value}
                        onRemove={() => removeImageUpload(value)}
                    />
                </div>
            ))}
        </React.Fragment>
        )
    }
    return (
        <React.Fragment>
            {renderUploadImage()}
        </React.Fragment>)
}

export default Upload