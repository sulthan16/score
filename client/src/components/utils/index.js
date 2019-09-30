import history from 'routes/history';
import AuthService from 'services/auth';
import { notifUtils } from 'components/NotifUtil';

const numbering = (value) => {
    if (value === 1) {
        return 'st'
    } else if (value === 2) {
        return 'nd'
    } else if (value === 3) {
        return 'rd'
    }
    return 'th'
};


const abbrName = (value) => {
    const splitName = value.trim().split(" ");
    if (splitName.length > 1) {
        return (splitName[0].charAt(0) + splitName[1].charAt(0) + (splitName[2] ? splitName[2].charAt(0) : ''));
    }
    return value;
};

const base64StringtoFile = (base64String, filename) => {
    var arr = base64String.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
}

const downloadBase64File = (base64Data, filename) => {
    var element = document.createElement('a')
    element.setAttribute('href', base64Data)
    element.setAttribute('download', filename)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
}

const extractImageFileExtensionFromBase64 = (base64Data) => {
    return base64Data.substring('data:image/'.length, base64Data.indexOf(';base64'))
}

const image64toCanvasRef = (canvasRef, image64, pixelCrop, fileName, extImage) => {
    const canvas = canvasRef // document.createElement('canvas');
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height
    const ctx = canvas.getContext('2d')
    const image = new Image()
    image.src = image64;
    image.onload = function () {
        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0, 0,
            pixelCrop.width,
            pixelCrop.height,
        )
    }
    return new Promise((resolve) => {
        resolve(true)
    })
}

const clearLocalStorage = async () => {
    try {
        const response = await AuthService.logout();
        if (response) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('instanceToken');
            notifUtils('Logout Successfully', 'success');
            history.push('/login');
        }
    } catch (e) {
        console.log(e);
        notifUtils('Internal Server Error , Please Wait', 'error');
    }

}

export {
    numbering, abbrName,
    base64StringtoFile,
    downloadBase64File,
    clearLocalStorage,
    extractImageFileExtensionFromBase64,
    image64toCanvasRef
}