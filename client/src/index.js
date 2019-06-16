import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import Axios from "axios";

import registerServiceWorker from "./registerServiceWorker";
import App from "./pages/App";
import ArheoApp from "./components/Arheo/ArheoApp";
import ShowArcheologist from "./components/Arheo/ShowArcheologist";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import reducers from "./reducers/index";
import authGuardAdmin from "./components/HOCs/authGuardAdmin";
import authGuardWriter from "./components/HOCs/authGuardWriter";
import NewArcheologist from "./components/Arheo/NewArcheologist";
import Dashboard from "./components/Dashboard/Dashboard";
import ViewAccount from "./components/Dashboard/ViewAccount";
import EditArcheologist from "./components/Arheo/EditArcheologist";
import Despre from "./components/Despre";
import Conditii from "./components/Conditii";
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
          userName: userName ? userName : "",
          role: role ? role : [],
          token: jwtToken,
          isAuthenticated: jwtToken ? true : false
        },
        form: {
          errorMessage: ""
        }
      },
      applyMiddleware(reduxThunk)
    )}
  >
    <BrowserRouter>
      <App>
        {/* <Switch> */}
        <Route exact path="/" component={ArheoApp} />
        <Route exact path="/arheolog/" component={ShowArcheologist} />
        <Route exact path="/account" component={ViewAccount} />

        <Route exact path="/Dashboard" component={authGuardAdmin(Dashboard)} />
        <Route
          exact
          path="/Dashboard/:userName"
          component={authGuardAdmin(props => (
            <ViewAccount userName={props.match.params.userName} {...props} />
          ))}
        />

        <Route
          exact
          path="/NewArcheologist"
          component={authGuardWriter(NewArcheologist)}
        />
        <Route exact path="/arheolog/edit/" component={authGuardWriter(EditArcheologist)} />
        <Route exact path="/Despre" component={Despre} />
        <Route exact path="/Conditii-de-utilizare" component={Conditii} />
        {/* <Route exact path="/edit" component={editCurrentUser} /> */}

        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/SignIn" component={SignIn} />
        {/* </Switch> */}
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
registerServiceWorker();
