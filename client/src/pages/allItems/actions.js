import ProductService from 'services/product';

export const get = async (store, query) => {
    const isLoading = true;
    const status = 200;
    store.setState({ isLoading, status, data: [] });
    try {
        const response = await ProductService.getData(query);
        const data = response.data;
        let result = data.result;
        const isLoading = false;
        const lastPage = false;
        const status = data.message;
        store.setState({ data: result, header: response.headers, isLoading, status, lastPage });
    } catch (error) {
        const status = error.response ? error.response.status : '';
        const message = error.response ? error.response.data.message : '';
        const isLoading = false;
        store.setState({ isLoading, status, message });
    }
};