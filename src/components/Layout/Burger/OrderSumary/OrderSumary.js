import React from 'react';
import Aux from '../../../../hoc/AuxHight';
import Button from '../../../UI/Button/Button';

const OrderSumary = props => {
  const ingredientSumary = Object.keys(props.ingredients).map(igKey => (
    <li key={igKey}>
      <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:
      {props.ingredients[igKey]}
    </li>
  ));
  return (
    <Aux>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSumary}</ul>
      <p>
        Total Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      <p>Continute to Checkout ?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelHandler}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinueHandler}>
        Continute
      </Button>
    </Aux>
  );
};

export default OrderSumary;
