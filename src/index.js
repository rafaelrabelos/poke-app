import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "./index.css";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Layout from "./layout/main/mainLayout";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/app" render={(props) => <Layout {...props} />} />
      <Redirect from="/" to="/app/pokemon" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
