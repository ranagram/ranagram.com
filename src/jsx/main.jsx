"use strict";
import React, { Component } from "react";
import { render } from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import App from "./components/App.jsx";
//import AppIndex from "./components/AppIndex.jsx";
import AppAbout from "./components/AppAbout.jsx";
import AppProgressIndex from "./components/AppWork.jsx";
import AppProgressEntry from "./components/AppWork.jsx";

window.addEventListener("DOMContentLoaded", () => {
  render((
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="about" component={AppAbout} />
        <Route path="about/index.html" component={AppAbout} />
        <Route path="progress/" component={AppProgressIndex} />
        <Route path="progress/index.html" component={AppProgressIndex} />
        <Route path="progress/:id" component={AppProgressEntry} />
      </Route>
    </Router>
  ), document.getElementById("app"));
}, false);
