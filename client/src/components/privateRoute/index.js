import React from 'react'
import {
    Route
} from 'react-router-dom'

const PrivateRoute = ({ name, component: Component, ...rest }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const clearLocalStorage = () =>{
        localStorage.removeItem('token') && localStorage.removeItem('user')
    }
    return (
        <Route {...rest} render={(props) => (
            localStorage.getItem('token') && localStorage.getItem('user')
                ? <Component {...props} params={user} />
                : clearLocalStorage()
        )} />

    )
}

export default PrivateRoute 