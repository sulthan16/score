import Axios from 'axios';
const defaultHeader = async () => {
    const token = localStorage.getItem('token')
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}`:`Bearer 12345`,
    };
};

const ApiService = async () => {
    const header = await defaultHeader();

    const instance = Axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        timeout: 60000,
        headers: header
    });

    return instance;
};

export default ApiService;