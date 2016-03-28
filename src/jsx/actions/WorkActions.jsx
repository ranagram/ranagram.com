"use strict";

import Dispatcher from "../dispatcher.jsx";

const WorkActions = {
  start (action) {
    Dispatcher.dispatch({
      type: "start"
    });
  }
};

export default WorkActions;
