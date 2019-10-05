import ApiService from '../ApiService';

export default class CategoryService {

    static getData = async (params) => {
        const instance = await ApiService();
        return instance.get(`/product`);
    }
    static deleteData = async (params) => {
        debugger
        const instance = await ApiService();
        return instance.delete(`/product/${params.id}`);
    }
}