import React, { Component } from 'react';
import CheckOutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  };
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    console.log(query.entries());
    const ingredients = {};
    let price = 0;
    for (const param of query.entries()) {
      if (param[0] === 'price') {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients, totalPrice: price });
  }
  checkOutCancelHandler = () => {
    this.props.history.goBack();
  };
  checkOutContineHandler = () => {
    console.log(this.props.match.path);
    this.props.history.replace('checkout/contact-data');
  };
  render() {
    return (
      <div>
        <CheckOutSummary
          ingredients={this.state.ingredients}
          checkOutContinue={this.checkOutContineHandler}
          checkOutCancel={this.checkOutCancelHandler}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          render={props => (
            <ContactData
              ingredients={this.props.ingredients}
              price={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
