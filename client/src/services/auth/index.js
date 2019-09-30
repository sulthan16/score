import ApiService from '../ApiService';

export default class AuthService {

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