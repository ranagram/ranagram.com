"use strict";
import { Component } from "react";
import { Container } from "flux/utils";

import WorkStore from "../stores/WorkStore.jsx";

class App extends Component {
  static getStores () {
    return [ WorkStore ];
  }
  static calculateState (prevState) {
    console.log('calculateState() was called in App.jsx');
    return {
      foo: WorkStore.getState()
    };
  }
  render () {
    return (
      <div className="app">{this.props.children}</div>
    );
  }
};

export default Container.create(App);
