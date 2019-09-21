import React from "react";
import useGlobalHook from "use-global-hook";

import * as actions from "./actions";

const initialState = {
  status: 200,
  isLoading: false,
  userData: []
};

const AuthStore = useGlobalHook(React, initialState, actions);

export default AuthStore;
