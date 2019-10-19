import ApiService from '../ApiService';

export default class UserService {

    static getData = async (params) => {
        const instance = await ApiService();
        return instance.get(`/user`);
    }
    static storeData = async (value) => {
        const instance = await ApiService();
        const params = {
            title: value.title,
            thumb: value.thumb
        }
        return instance.post(`/insertUser`, params);
    }
    static putData = async (value) => {
        const instance = await ApiService();
        const params = {
            title: value.title,
            thumb: value.thumb
        }
        return instance.put(`/updateUser/${value.id}`, params);
    }
    static deleteData = async (params) => {
        const instance = await ApiService();
        return instance.delete(`/user/${params.id}`);
    }
}