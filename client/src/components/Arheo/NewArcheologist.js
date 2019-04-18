import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';


import CustomInput from './../CustomInput';
import CustomTextarea from './../CustomTextarea';
import * as actions from './../../actions';
class NewArcheologist extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
    }

    async onSubmit(formData) {
        formData.date = new Date();
        await this.props.NewArcheologist(formData)
        if (!this.props.errorMessage) {
            this.props.history.push("/");
        }
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="row">
                <div className="col">
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <fieldset>
                            <Field
                                name="title"
                                type="text"
                                id="Title"
                                label="Title:"
                                placeholder="New Archeologist"
                                component={CustomInput} />
                        </fieldset>
                        <fieldset>
                            <Field
                                name="body"
                                type="text"
                                id="body"
                                label=""
                                placeholder=""
                                rows="5"
                                component={CustomTextarea} />
                        </fieldset>
                        {this.props.errorMessage ?
                            <div className="alert  alert-danger">
                                {this.props.errorMessage}
                            </div>
                            : null}
                        <button type="submit" className="btn btn-primary" >Save</button>
                    </form>
                </div>
            </div>
        );
    }
}

function MapStateToProps(state) {
    return {
        errorMessage: state.arhe.errorMessage
    }
}

export default compose(
    connect(MapStateToProps, actions),
    reduxForm({ form: 'NewArcheologist' })
)(NewArcheologist);