import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import './index.css';
import Layout  from './layout/main/mainLayout';

import { App } from './pages';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/app" render={(props) => <Layout {...props} />} />
      <Redirect from="/" to="/app/pokemon" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
