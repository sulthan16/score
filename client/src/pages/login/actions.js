import AuthService from 'services/auth';
import history from 'routes/history';
import { notifUtils } from 'components/NotifUtil';

export const onSubmitLogin = async (store, email, password, token) => {
    const isLoading = !store.state.isLoading;
    const status = 200;
    store.setState({ isLoading, status });
    try {
        const response = await AuthService.login(email, password, token);
        const userData = response.data.user;
        const isLoading = false;
        const status = response.status;
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(userData));
        store.setState({ userData, isLoading, status });
        notifUtils('Successfully Updated Facility', 'success');
        history.push('/cashier');
    } catch(error) {
        const status = error.response ? error.response.status : '';
        const message = error.response ? error.response.data.message : '';
        const isLoading = false;
        store.setState({ isLoading, status, message });
    }
};

