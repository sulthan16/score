import React from "react";
import useGlobalHook from "use-global-hook";

import * as actions from "actions/AppActions";

const initialState = {
  status: 200,
  isLoading: false,
  userData: [],
  imageUpload: [''],
  expand: true
};

const AppStore = useGlobalHook(React, initialState, actions);

export default AppStore;
