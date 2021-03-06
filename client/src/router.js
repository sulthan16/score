import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Loadable from 'react-loadable';
import PrivateRoute from "components/privateRoute"
import history from "routes/history";
import Loading from "components/loader";
import { withRouter } from "react-router";
import login from 'pages/login';

function AppRouter() {

  const LoadableComponent = params =>
    Loadable({
      loader: params,
      loading: Loading
    })

  const clearLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push('/login');
  }

  return (
    <Router history={history}>
      <Switch>
        <Route exact name="Login" path="/login" component={login} />
        <Route path="/" name="Root" exact render={clearLocalStorage} />
        <PrivateRoute path="/Cashier" name="cashier" exact component={LoadableComponent(() => import('pages/cashier'))} />
        {/* <PrivateRoute exact path='/task/:id' name="Task" component={LoadableComponent(() => import('pages/task'))} /> */}
        <PrivateRoute exact path='/categories' name="categories" component={LoadableComponent(() => import('pages/categories'))} />
        <PrivateRoute exact path='/all-items' name="product" component={LoadableComponent(() => import('pages/allItems'))} />
        <PrivateRoute exact path='/roles' name="roles" component={LoadableComponent(() => import('pages/roles'))} />
        <PrivateRoute exact path='/user' name="user" component={LoadableComponent(() => import('pages/users'))} />
      </Switch>
    </Router>
  );
}

export default withRouter(AppRouter);