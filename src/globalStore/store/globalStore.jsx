import React from "react";
import useGlobalHook from "hooks/useGlobalHook";

import * as actions from "globalStore/actions/actions";

const initialState = {
  userLoggedIn: false
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;
