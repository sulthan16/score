import ApiService from '../ApiService';

export default class CategoryService {

    static getData = async (params) => {
        const instance = await ApiService();
        return instance.get(`/categories`);
    }
    static storeData = async (value) => {
        const instance = await ApiService();
        const params = {
            title: value.title,
            thumb: value.thumb
        }
        return instance.post(`/insertCategory`, params);
    }
    static putData = async (value) => {
        const instance = await ApiService();
        const params = {
            title: value.title,
            thumb: value.thumb
        }
        return instance.put(`/updateCategory/${value.id}`, params);
    }
    static deleteData = async (params) => {
        const instance = await ApiService();
        return instance.delete(`/categories/${params.id}`);
    }
}