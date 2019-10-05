import ApiService from '../ApiService';

export default class CategoryService {

    static getData = async (params) => {
        const instance = await ApiService();
        return instance.get(`/categories`);
    }
    static deleteData = async (params) => {
        const instance = await ApiService();
        return instance.delete(`/categories/${params.id}`);
    }
}