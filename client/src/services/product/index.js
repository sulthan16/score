import ApiService from '../ApiService';

export default class CategoryService {

    static getData = async (params) => {
        const instance = await ApiService();
        return instance.get(`/product`);
    }
    static findData = async (params)=>{
        const instance = await ApiService();
        return instance.get(`/productFind?search=${params.search}`);
    }
    static storeData = async (value) => {
        const instance = await ApiService();
        const params = {
            title: value.title,
            thumb: value.thumb,
            images: value.images.length > 0 ? JSON.stringify(value.images) : '',
            price: value.price,
            sellPrice: value.sellPrice,
            barcode: value.barcode,
            discon: value.discon,
            CategoryId: value.CategoryId.data.id,
            stock: parseInt(value.stock),
            type: "in"
        }
        return instance.post(`/insertProduct`, params);
    }
    static putData = async (value) => {
        const instance = await ApiService();
        const params = {
            title: value.title,
            thumb: value.thumb,
            images: value.images.length > 0 ? JSON.stringify(value.images) : '',
            price: value.price,
            sellPrice: value.sellPrice,
            barcode: value.barcode,
            discon: value.discon,
            CategoryId: value.CategoryId.data.id,
            stock: parseInt(value.stock),
            type: "in"
        }
        return instance.put(`/updateProduct/${value.id}`, params);
    }
    static deleteData = async (params) => {
        const instance = await ApiService();
        return instance.delete(`/product/${params.id}`);
    }
}