"use strict";

import Immutable from "immutable";
import { ReduceStore } from "flux/utils";
import Dispatcher from "../dispatcher.jsx";

class WorkStore extends ReduceStore {
  getInitialState () {
    return Immutable.Map({
      works: []
    });
  }

  reduce (state, action) {
    switch (action.type) {
      case "fetch":
        return Immutable.Map({ works: action.data });
        break;
    }
  }
}

const instance = new WorkStore(Dispatcher);
export default instance;
