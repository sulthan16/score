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
        update: false,
        data: []
    }
    user.role.map(role => {
        if (role.Feature.name === name) {
            if (role.show) {
                allowAccess = {
                    show: role.show,
                    name: role.Feature.name,
                    read: role.read,
                    create: role.create,
                    delete: role.delete,
                    update: role.update,
                    data: role
                }
            }
            return allowAccess
        }
        return allowAccess
    })
    return (
        <Route {...rest} render={(props) => (
            allowAccess.show
                ? <Component {...props} params={allowAccess} />
                : clearLocalStorage()
        )} />

    )
}

export default PrivateRoute 