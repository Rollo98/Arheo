import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (OriginalComponent) => {
    class MixedComponent extends Component {
        checkAuth() {
            if (!this.props.isAuth && !this.props.jwtToken) {
                this.props.history.push('/Signin');
            }
        };
        componentDidMount() {
            this.checkAuth();
        };

        componentDidUpdate() {
            this.checkAuth();
        };

        render() {
          console.log("user",this.props)
            return <OriginalComponent {...this.props} />;
        }
    }

    function MapStateToProps(state) {
        return {
            isAuth: state.auth.isAuthenticated,
            jwtToken: state.auth.token
        }
    }
    return connect(MapStateToProps)(MixedComponent);
}