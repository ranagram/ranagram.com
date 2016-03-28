"use strict";
import React, { Component } from "react";
import { render } from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import App from "./components/App.jsx";
import AppIndex from "./components/AppIndex.jsx";
import AppAbout from "./components/AppAbout.jsx";

window.addEventListener("DOMContentLoaded", () => {
  render((
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={AppIndex} />
        <Route path="index.html" component={AppIndex} />
        <Route path="about.html" component={AppAbout} />
      </Route>
    </Router>
  ), document.getElementById("content"));
}, false);
