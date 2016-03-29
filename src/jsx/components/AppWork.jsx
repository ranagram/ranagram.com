"use strict";
import React, { Component } from "react";
import { Container } from "flux/utils";

import WorkStore from "../stores/WorkStore.jsx";

class AppWork extends Component {
  static getStores () {
    return [ WorkStore ];
  }
  static calculateState (prevState) {
    console.log('this.props:', this.props);
    return {
      foo: "bar"
    }
  }
  render () {
    return (
      <div className="work">Work</div>
    );
  }
}

export default Container.create(AppWork);
