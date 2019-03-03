import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import Axios from 'axios';

import registerServiceWorker from './registerServiceWorker';
import App from './pages/App';
import ArheoApp from './components/ArheoApp';
import ShowNote from './components/ShowNote';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import reducers from './reducers/index';
import authGuard from './components/HOCs/authGuard';
import NewNote from './components/NewNote';

const jwtToken = localStorage.getItem('JWT_TOKEN');
Axios.defaults.headers.common['Authorization'] = jwtToken;


ReactDOM.render(
    <Provider store={createStore(reducers, {
        auth: {
            token: jwtToken,
            isAuthenticated: jwtToken ? true : false
        }
    }, applyMiddleware(reduxThunk))}>
        <BrowserRouter>
            <App >
                <Route exact path="/" component={ArheoApp} />
                <Route exact path="/NewNote" component={authGuard(NewNote)} />
                <Route exact path="/note/:title::date" component={(props) => <ShowNote title={props.match.params.title} date={props.match.params.date} {...props} />} />

                <Route exact path="/SignUp" component={SignUp} />
                <Route exact path="/SignIn" component={SignIn} />
            </App>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
registerServiceWorker();