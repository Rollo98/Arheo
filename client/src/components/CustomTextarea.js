import React, { Component } from 'react';

export default class CustomTextarea extends Component {
    render() {
        const { input: { value, onChange } } = this.props
        return (
            <div className="form-group">
                <label htmlFor={this.props.id}> {this.props.label}</label>
                <textarea name={this.props.id}
                    id={this.props.id}
                    placeholder={this.props.placeholder}
                    className="form-control"
                    rows={this.props.rows ? this.props.rows : 1}
                    type={this.props.type}
                    value={value}
                    onChange={onChange}
                />
            </div>
        );
    }
}
