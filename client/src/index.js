import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter } from 'react-router-dom';
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
