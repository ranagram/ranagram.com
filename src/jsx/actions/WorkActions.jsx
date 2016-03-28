"use strict";

import Dispatcher from "../dispatcher.jsx";
import superagent from "superagent";

const WorkActions = {
  fetch (action) {
    superagent.get("./data.json")
      .accept("json")
      .end((err, res) => {
        Dispatcher.dispatch({
          type: "fetch",
          data: res.body
        });
      });
  }
};

export default WorkActions;
