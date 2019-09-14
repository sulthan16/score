import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import AppRouter from './router';
import theme from './theme';
import './index.css'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <CssBaseline />
      <AppRouter />
    </BrowserRouter>
  </ThemeProvider>,
  document.querySelector('#root'),
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
