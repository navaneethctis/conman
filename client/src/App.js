import React from 'react';
import {Route, Switch} from 'react-router-dom';

import AlertProvider from './contexts/alert/AlertProvider';
import AuthProvider from './contexts/auth/AuthProvider';
import ContactProvider from './contexts/contact/ContactProvider';

import AlertsList from './components/layout/AlertsList';
import HomePage from './components/page/HomePage';
import LoginPage from './components/page/LoginPage';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/router/PrivateRoute';
import RegisterPage from './components/page/RegisterPage';

const App = () => (
  <AlertProvider>
    <AuthProvider>
      <ContactProvider>
        <Navbar />
        <AlertsList />
        <Switch>
          <PrivateRoute exact path='/' component={HomePage} />
          <Route exact path='/register' component={RegisterPage} />
          <Route exact path='/login' component={LoginPage} />
        </Switch>
      </ContactProvider>
    </AuthProvider>
  </AlertProvider>
);

export default App;
