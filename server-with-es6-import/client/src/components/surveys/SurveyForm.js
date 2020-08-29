import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';
import validateEmail from '../../utils/validateEmail';
import formFields from './formFields';

class SurveyForm extends React.Component {
    renderFields = () => {
        return Array.from(formFields, (field) => {
            return (
                <Field
                    key={field.name}
                    component={SurveyField}
                    type="text"
                    {...field}
                />
            );
        });
    };

    render() {
        return (
            <div>
                <form
                    onSubmit={this.props.handleSubmit((values) =>
                        this.props.onSurveySubmit()
                    )}
                >
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="teal btn-flat right white-text"
                    >
                        Next
                        <i className="material-icons right">chevron_right</i>
                    </button>
                </form>
            </div>
        );
    }
}

const validate = (values) => {
    const errors = {};

    errors.recipients = validateEmail(values.recipients || '');

    formFields.forEach(({ name }) => {
        if (!values[name]) {
            return (errors[name] = 'This field cannot be empty!');
        }
    });

    return errors;
};

export default reduxForm({
    form: 'surveyForm',
    validate,
    destroyOnUnmount: false
})(SurveyForm);
