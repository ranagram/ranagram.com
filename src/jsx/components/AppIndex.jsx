"use strict";
import React, { Component } from "react";
import { Container } from "flux/utils";

import WorkStore from "../stores/WorkStore.jsx";

class AppIndex extends Component {
  static getStores () {
    return [ WorkStore ];
  }
  static calculateState (prevState) {
    console.log('calculateState() was called in AppIndex.jsx');
    return {
      foo: WorkStore.getState()
    };
  }
  render () {
    return (
      <div className="index">Index</div>
    );
  }
};

export default Container.create(AppIndex);
