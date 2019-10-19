import ApiService from '../ApiService';

export default class UserService {

    static getData = async (params) => {
        const instance = await ApiService();
        return instance.get(`/user`);
    }
    static storeData = async (value) => {
        const instance = await ApiService();
        const params = {
            email: value.email,
            password: value.password,
            level: value.level.data.id,
            RoleId: value.level.data.level,
            name: value.name,
            employeeId: value.employeeId,
            photos: value.photos
        }
        return instance.post(`/insertUser`, params);
    }
    static putData = async (value) => {
        const instance = await ApiService();
        const params = {
            email: value.email,
            password: value.password,
            level: value.level.data.id,
            RoleId: value.level.data.level,
            name: value.name,
            employeeId: value.employeeId,
            photos: value.photos
        }
        return instance.put(`/updateUser/${value.id}`, params);
    }
    static deleteData = async (params) => {
        const instance = await ApiService();
        return instance.delete(`/user/${params.id}`);
    }
}