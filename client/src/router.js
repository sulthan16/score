import React from "react";
import { Router, Route, Switch } from "react-router-dom";
// import Loadable from 'react-loadable';
// import theme from "./theme";
// import PrivateRoute from "components/privateRoute"
import history from "routes/history";
// import Loading from "components/loader";
import { withRouter } from "react-router";
// import login from 'pages/login';
import Home from 'pages/home';

function AppRouter() {

  // const LoadableComponent = params =>
  //   Loadable({
  //     loader: params,
  //     loading: Loading
  //   })

  // const clearLocalStorage = () => {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  //   history.push('/login');
  // }

  return (
    <Router history={history}>
      <Switch>
        {/* <Route exact name="Login" path="/login" component={login} /> */}
        <Route path="/" name="Root" exact component={Home} />
        {/* <Route path="/" name="Root" exact render={clearLocalStorage} /> */}
        {/* <Route exact path="/home" name="Home" component={LoadableComponent(() => import('pages/home'))} />
        <PrivateRoute exact path='/task/:id' name="Task" component={LoadableComponent(() => import('pages/task'))} />
        <PrivateRoute exact path='/facility' name="Facility" component={LoadableComponent(() => import('pages/facility'))} /> */}
      </Switch>
    </Router>
  );
}

export default withRouter(AppRouter);