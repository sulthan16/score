import ProductService from 'services/product';
// import { notifUtils } from 'components/NotifUtil';

export const setGlobalState = (store) => {
    const userData = JSON.parse(localStorage.getItem('user'));
    store.setState({ userData: userData })
};
export const setImageUpload = (store, value) => {
    store.setState({ imageUpload: value });
}
export const setExpand = (store, value) => {
    store.setState({ expand: value });
}
export const findProduct = async (store, query) => {
    const isLoading = true;
    const status = 200;
    store.setState({ isLoading, status, data: [] });
    try {
        const response = await ProductService.getDataByBarcode(query);
        const data = response.data;
        let result = [];
        result.push(data.result);
        const isLoading = false;
        const lastPage = false;
        const status = data.message;
        store.setState({ data: result, header: response.headers, isLoading, status, lastPage });
        return true;
    } catch (error) {
        const status = error.response ? error.response.status : '';
        const message = error.response ? error.response.data.message : '';
        const isLoading = false;
        store.setState({ isLoading, status, message });
        return false
    }
};
