import React from 'react'
import {
    Route
} from 'react-router-dom'
import history from 'routes/history';

const PrivateRoute = ({ name, component: Component, ...rest }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const clearLocalStorage = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        history.push('/login');
    }
    let allowAccess = {
        name: '',
        show: false,
        read: false,
        create: false,
        delete: false,
        put: false,
        data: []
    }
    if (user) {
        user.role.map(role => {
            if (role.Feature.name === name) {
                if (role.show === '1') {
                    allowAccess = {
                        show: role.show === '1',
                        name: role.Feature.name,
                        read: role.read === '1',
                        create: role.create === '1',
                        delete: role.delete === '1',
                        put: role.put === '1',
                        data: role
                    }
                }
                return allowAccess
            }
            return allowAccess
        })
    } else {
        clearLocalStorage();
    }

    return (
        <Route {...rest} render={(props) => (
            allowAccess.show
                ? <Component {...props} params={allowAccess} />
                : clearLocalStorage()
        )} />

    )
}

export default PrivateRoute 