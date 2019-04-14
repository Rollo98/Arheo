import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import Axios from "axios";

import registerServiceWorker from "./registerServiceWorker";
import App from "./pages/App";
import ArheoApp from "./components/ArheoApp";
import ShowArcheologist from "./components/ShowArcheologist";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import reducers from "./reducers/index";
import authGuardAdmin from "./components/HOCs/authGuardAdmin";
import authGuardWriter from "./components/HOCs/authGuardWriter";
import NewArcheologist from "./components/NewArcheologist";
import Dashboard from "./components/Dashboard";

import "./main.scss";

const userName = localStorage.getItem("uNema"),
 role = JSON.parse(localStorage.getItem("pRemisiuni")),
 jwtToken = localStorage.getItem("zeBilet");
Axios.defaults.headers.common["Authorization"] = jwtToken;

ReactDOM.render(
  <Provider
    store={createStore(
      reducers,
      {
        auth: {
          userName:userName,
          role: role,
          token: jwtToken,
          isAuthenticated: jwtToken ? true : false
        }
      },
      applyMiddleware(reduxThunk)
    )}
  >
    <BrowserRouter>
      <App>
        <Route exact path="/" component={ArheoApp} />
        <Route exact path="/Dashboard" component={authGuardAdmin(Dashboard)} />
        {/* <Route
          exact
          path="/NewArcheologist"
          component={authGuardWriter(NewArcheologist)}
        /> */}
        {/* <Route
          exact
          path="/:firstName_:lastName/edit"
          component={authGuardWriter(NewArcheologist)}
        /> */}
        {/* <Route
          exact
          path="/:firstName_:lastName"
          component={props => (
            <ShowArcheologist
              firstName={props.match.params.firstName}
              lastName={props.match.params.lastName}
              {...props}
            /> */}
          )}
        />
        {/* <Route exact path="/edit" component={editCurrentUser} /> */}
        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/SignIn" component={SignIn} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
registerServiceWorker();
