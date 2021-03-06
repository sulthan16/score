import UserService from 'services/users';
import { notifUtils } from 'components/NotifUtil';

export const get = async (store, query) => {
    const isLoading = true;
    const status = 200;
    store.setState({ isLoading, status, data: [] });
    try {
        const response = await UserService.getData(query);
        const data = response.data;
        let result = data.result;
        const isLoading = false;
        const lastPage = false;
        const status = data.status;
        store.setState({ data: result, header: response.headers, isLoading, status, lastPage });
    } catch (error) {
        const status = error.response ? error.response.status : '';
        const message = error.response ? error.response.data.message : '';
        const isLoading = false;
        store.setState({ isLoading, status, message });
    }
};
export const find = async (store, query) => {
    const isLoading = true;
    const status = 200;
    store.setState({ isLoading, status, data: [] });
    try {
        const response = await UserService.findData(query);
        const data = response.data;
        let result = data.result;
        const isLoading = false;
        const lastPage = false;
        const status = data.status;
        store.setState({header: response.headers, isLoading, status, lastPage });
        return result
    } catch (error) {
        const status = error.response ? error.response.status : '';
        const message = error.response ? error.response.data.message : '';
        const isLoading = false;
        store.setState({ isLoading, status, message });
        return false
    }
};
export const store = async (store, value) => {
    const isLoading = !store.state.isLoading;
    const status = 200;
    store.setState({ isLoading, status });
    try {
      const response = await UserService.storeData(value);
      const data = response.data;
      const isLoading = false;
      const status = data.message;
      notifUtils('Data Berhasil Di Tambahkan', 'success');
      store.setState({ isLoading, status });
      return data
    } catch (error) {
      const status = error.response ? error.response.status : '';
      const message = 'Error';
      const isLoading = false;
      store.setState({ isLoading, status, message });
      return message
    }
  };
  export const put = async (store, value) => {
    const isLoading = !store.state.isLoading;
    const status = 200;
    store.setState({ isLoading, status });
    try {
      const response = await UserService.putData(value);
      const data = response.data;
      const isLoading = false;
      const status = data.message;
      notifUtils('Data Berhasil Di Rubah', 'success');
      store.setState({ isLoading, status });
      return data
    } catch (error) {
      const status = error.response ? error.response.status : '';
      const message = 'Error';
      const isLoading = false;
      store.setState({ isLoading, status, message });
      return message
    }
  };
export const deleted = async (store, query) => {
    const isLoading = true;
    const status = 200;
    store.setState({ isLoading, status, data: [] });
    try {
        const response = await UserService.deleteData(query);
        const data = response.data;
        const isLoading = false;
        const lastPage = false;
        const status = data.status;
        notifUtils('Data Berhasil Di Hapus', 'success');
        store.setState({ header: response.headers, isLoading, status, lastPage });
        return true
    } catch (error) {
        const status = error.response ? error.response.status : '';
        const message = error.response ? error.response.data.message : '';
        const isLoading = false;
        store.setState({ isLoading, status, message });
        return false
    }
};