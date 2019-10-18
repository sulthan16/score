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
        menusAccess: false,
        read: false,
        create: false,
        delete: false,
        put: false,
        data: []
    }
    if (user) {
        user.menu.map(item => {
            if (item.menu) {
                item.menu.map(value => {
                    if (value.name === name) {
                        if (value.menusAccess) {
                            allowAccess = {
                                menusAccess: value.menusAccess,
                                name: value.name,
                                read: value.read,
                                create: value.create,
                                delete: value.delete,
                                put: value.put,
                                data: value
                            }
                        }
                        return allowAccess
                    }
                    return allowAccess
                })
            } else {
                allowAccess = {
                    name: '',
                    menusAccess: false,
                    read: false,
                    create: false,
                    delete: false,
                    put: false,
                    data: []
                }
            }
            return allowAccess
        })
    } else {
        clearLocalStorage();
    }

    return (
        <Route {...rest} render={(props) => (
            allowAccess.menusAccess
                ? <Component {...props} params={allowAccess} />
                : clearLocalStorage()
        )} />

    )
}

export default PrivateRoute 