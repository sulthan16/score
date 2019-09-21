import Axios from 'axios';
import ApiService from '../ApiService';

export default class AuthService {

    // for custom url, ex: get data from bucket
    static getData = async (url) => Axios.get(url)

    static login = async (email, password, fcmToken) => {
        const instance = await ApiService();
        return instance.post('/login', {
            email,
            password,
            fcm_token_web: fcmToken
        });
    }
    static logout = async () => {
        const instance = await ApiService();
        return instance.post('/logout');
    }

}