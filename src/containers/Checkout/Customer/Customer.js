import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-firebase';

import handleErrors from '../../../hoc/handleErrors/handleErrors';

import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';

import * as actions from '../../../actions';

import { validateFields } from '../../../utils/utils';

import classes from './Customer.css';

class Customer extends Component {
  state = {
    form: {
      name: {
        fieldType: 'input',
        fieldConfig: {
          type: 'text',
          placeholder: 'Name'
        },
        value: '',
        validation: {
          required: true
        },
        touched: false,
        valid: false
      },
      email: {
        fieldType: 'input',
        fieldConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true
        },
        touched: false,
        valid: false
      },
      phone: {
        fieldType: 'input',
        fieldConfig: {
          type: 'text',
          placeholder: 'Phone'
        },
        value: '',
        validation: {
          required: true,
          minLength: 10,
          maxLength: 11
        },
        touched: false,
        valid: false
      },
      street: {
        fieldType: 'input',
        fieldConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        touched: false,
        valid: false
      },
      city: {
        fieldType: 'input',
        fieldConfig: {
          type: 'text',
          placeholder: 'City'
        },
        value: '',
        validation: {
          required: true
        },
        touched: false,
        valid: false
      },
      state: {
        fieldType: 'input',
        fieldConfig: {
          type: 'text',
          placeholder: 'State'
        },
        value: '',
        validation: {
          required: true,
          minLength: 2,
          maxLength: 2
        },
        touched: false,
        valid: false
      },
      zipcode: {
        fieldType: 'input',
        fieldConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        touched: false,
        valid: false
      },
      deliveryMethod: {
        fieldType: 'select',
        fieldConfig: {
          options: [
            { value: 'ground', label: 'Ground' },
            { value: '3dayair', label: '3 Day Air' },
            { value: '2dayair', label: '2 Day Air' }
          ]
        },
        value: 'ground',
        validation: {},
        valid: true
      }
    },
    formValid: false
  };

  placeOrder = event => {
    const { features, total, id } = this.props;
    event.preventDefault();

    const customer = {};

    for (let field in this.state.form) {
      customer[field] = this.state.form[field].value;
    }

    const order = { customer, features, total, id };

    this.props.orderStart(order, this.props.token);
  };

  updateField = (event, field) => {
    // 2 spreads to deeply clone state and get copies of nested properties from state
    const updatedForm = {
      ...this.state.form
    };

    const updatedField = {
      ...updatedForm[field]
    };

    // update value property on individual field
    updatedField.value = event.target.value;

    // update valid status
    updatedField.valid = validateFields(
      updatedField.value,
      updatedField.validation
    );
    updatedField.touched = true;

    // update copied state object
    updatedForm[field] = updatedField;

    // console.log(updatedField);
    // check form validity
    let formValid = true;

    for (let field in updatedForm) {
      formValid = updatedForm[field].valid && formValid;
    }

    // update state
    this.setState({ form: updatedForm, formValid });
  };

  render() {
    const formFields = [];

    // loop over this.state.form object and push values to formFields array with config
    for (let field in this.state.form) {
      formFields.push({
        id: field,
        config: this.state.form[field]
      });
    }

    let form = (
      <form onSubmit={this.placeOrder}>
        {formFields.map(field => (
          <Input
            key={field.id}
            update={event => this.updateField(event, field.id)}
            fieldType={field.config.fieldType}
            fieldConfig={field.config.fieldConfig}
            value={field.config.value}
            validation={field.config.validation}
            touched={field.config.touched}
            invalid={!field.config.valid}
          />
        ))}
        <Button ButtonType="Success" disabled={!this.state.formValid}>
          Order
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.Customer}>
        <h4>Customer Information</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  features: state.builder.features,
  total: state.builder.total,
  id: state.auth.id,
  loading: state.order.loading,
  token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  orderStart: (order, token) => dispatch(actions.orderStart(order, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  handleErrors(Customer, axios)
);
