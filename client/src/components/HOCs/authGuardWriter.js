import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (OriginalComponent) => {
    class MixedComponent extends Component {
        checkAuth() {
            if (!this.props.isAuth && !this.props.jwtToken && !this.props.role.includes("writer")) {
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
            return <OriginalComponent {...this.props} />;
        }
    }

    function MapStateToProps(state) {
        return {
            role: state.auth.role,
            isAuth: state.auth.isAuthenticated,
            jwtToken: state.auth.token
        }
    }
    return connect(MapStateToProps)(MixedComponent);
}