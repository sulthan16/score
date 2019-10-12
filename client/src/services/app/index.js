import ApiService from '../ApiService';

export default class AppService {

    static uploadImage = async (value) => {
        const instance = await ApiService();
        return instance.post('/upload-image',
            value
        );
    }
}