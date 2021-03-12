import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
// import { purchaseBurgerStart } from '../../../store/actions/order';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: { type: 'text', placeholder: 'Your Name' },
        value: '',
        validation: {
          require: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: { type: 'text', placeholder: 'street' },
        value: '',
        validation: {
          require: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: { type: 'text', placeholder: 'Zip Code' },
        value: '',
        validation: {
          require: true,
          minLenth: 5,
          maxLenth: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: { type: 'text', placeholder: 'Country' },
        value: '',
        validation: {
          require: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: { type: 'email', placeholder: 'Your E-Mail' },
        value: '',
        validation: {
          require: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: 'fastest',
        validation: {},
        valid: true,
      },
    },
    formisValid: false,
  };
  orderHandler = event => {
    // console.log('Contact Data' + this.props.ingredients);
    event.preventDefault();
    // this.setState({ loading: true });
    const formData = {};
    for (let formElementIndentifier in this.state.orderForm) {
      formData[formElementIndentifier] = this.state.orderForm[
        formElementIndentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
    };

    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangedHandler = (event, inputIndentifier) => {
    const updatedFormElement = updateObject(
      this.state.orderForm[inputIndentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.orderForm[inputIndentifier].validation
        ),
        touched: true,
      }
    );

    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIndentifier]: updatedFormElement,
    });
    // updatedFormElement.value = event.target.value;
    // updatedFormElement.touched = true;
    // updatedFormElement.valid = this.checkValidity(
    //   updatedFormElement.value,
    //   updatedFormElement.validation
    // );
    // updatedOrderForm[inputIndentifier] = updatedFormElement;
    let formisValid = true;
    for (let inputIndentifier in updatedOrderForm) {
      formisValid = updatedOrderForm[inputIndentifier].valid && formisValid;
    }
    this.setState({ orderForm: updatedOrderForm, formisValid: formisValid });
  };
  render() {
    const formElementArray = [];
    for (const key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={event => this.inputChangedHandler(event, formElement.id)}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formisValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
