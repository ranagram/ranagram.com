"use strict";
import React, { Component } from "react";
import { render } from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import App from "./components/App.jsx";
import AppAbout from "./components/AppAbout.jsx";

window.addEventListener("DOMContentLoaded", () => {
  render((
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="about" component={AppAbout} />
        <Route path="about/index.html" component={AppAbout} />
      </Route>
    </Router>
  ), document.getElementById("app"));
}, false);
