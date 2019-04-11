import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./auth";
import archeologistReducer from "./archeologist";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  archeologist: archeologistReducer
});
