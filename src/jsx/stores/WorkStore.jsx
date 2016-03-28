"use strict";

import Immutable from "immutable";
import { ReduceStore } from "flux/utils";
import Dispatcher from "../dispatcher.jsx";

class WorkStore extends ReduceStore {
  getInitialState () {
    return Immutable.Map({
      foo: "foooo"
    });
  }

  reduce (state, action) {
    switch (action.type) {
      case "fetch":
        return { foo: "bar" };
        break;
      case "remove":
        return { piyo: "moge" };
        break;
    }
  }
}

const instance = new WorkStore(Dispatcher);
export default instance;
