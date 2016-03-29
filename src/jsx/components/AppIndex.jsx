"use strict";
import React, { Component } from "react";
import { Container } from "flux/utils";
import _ from "lodash";

import WorkStore from "../stores/WorkStore.jsx";
import WorkActions from "../actions/WorkActions.jsx";

class AppIndex extends Component {
  static getStores () {
    return [ WorkStore ];
  }
  static calculateState (prevState) {
    console.log('calculateState() was called in AppIndex.jsx');
    var workData = WorkStore.getState().toJS();
    var large, small;
    if (_.isArray(workData.works)) {
      var large = _.filter(workData.works, (work) => {
        return work.topsize === "large";
      });
      var small = _.filter(workData.works, (work) => {
        return work.topsize === "small";
      });
    }
    return {
      worksLarge: large,
      worksSmall: small
    };
  }
  componentWillMount () {
    WorkActions.fetch();
  }
  render () {
    var makeItem = (work) => {
      return (
        <li key={work.uid}>
          <a href={"/works/" + work.uid}>
            <img src={"/imgs/works/" + work.uid + "/top.jpg"} alt="" />
            <p>{work.toptitle.join("<br />")}</p>
          </a>
        </li>
      );
    };
    var large = this.state.worksLarge.map(makeItem);
    var small = this.state.worksSmall.map(makeItem);
    return (
      <div className="index">
        <ul className="works large">{large}</ul>
        <ul className="works small">{small}</ul>
      </div>
    );
  }
};

export default Container.create(AppIndex);
