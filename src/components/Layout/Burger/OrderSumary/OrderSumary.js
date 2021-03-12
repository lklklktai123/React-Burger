import React, { Component } from 'react';
import Aux from '../../../../hoc/AuxHight';
import Button from '../../../UI/Button/Button';

class OrderSumary extends Component {
  componentWillUpdate() {
    // console.log('[order sumary] will update');
  }
  render() {
    const ingredientSumary = Object.keys(this.props.ingredients).map(igKey => (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:
        {this.props.ingredients[igKey]}
      </li>
    ));
    return (
      <Aux>
        <h3>Your order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSumary}</ul>
        <p>
          Total Price: <strong>{this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continute to Checkout ?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelHandler}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinueHandler}>
          Continute
        </Button>
      </Aux>
    );
  }
}
export default OrderSumary;
