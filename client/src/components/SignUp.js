import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";

import CustomInput from "./CustomInput";
import * as actions from "../actions";
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  async onSubmit(formData) {
    await this.props.SignUp(formData);
    if (!this.props.errorMessage) {
      this.props.history.push("/");
    }
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="row signing text-center">
        <div className="col">
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <fieldset>
              <Field
                name="userName"
                type="text"
                id="userName"
                label="Enter an username"
                placeholder="user1"
                component={CustomInput}
              />
            </fieldset>
            <fieldset>
              <Field
                name="email"
                type="text"
                id="email"
                label="Enter your email"
                placeholder="example@example.com"
                component={CustomInput}
              />
            </fieldset>
            <fieldset>
              <Field
                name="firstName"
                type="text"
                id="firstName"
                label="Enter your first name"
                placeholder=""
                component={CustomInput}
              />
            </fieldset>
            <fieldset>
              <Field
                name="lastName"
                type="text"
                id="lasstName"
                label="Enter your last name"
                placeholder=""
                component={CustomInput}
              />
            </fieldset>
            <fieldset>
              <Field
                name="password"
                type="password"
                id="password"
                label="Enter your password"
                placeholder=""
                component={CustomInput}
              />
            </fieldset>
            <fieldset>
              <Field
                name="passwordVerify"
                type="password"
                id="passwordVerify"
                label="Re-enter your password"
                placeholder=""
                component={CustomInput}
              />
            </fieldset>
            {this.props.errorMessage ? (
              <div className="alert  alert-danger">
                {this.props.errorMessage}
              </div>
            ) : null}
            <button type="submit" className="button saveButton">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function MapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage
  };
}

export default compose(
  connect(
    MapStateToProps,
    actions
  ),
  reduxForm({ form: "signup" })
)(SignUp);
