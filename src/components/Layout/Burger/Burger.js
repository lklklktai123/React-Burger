import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
const burger = probs => {
  let tranformedIngredient = Object.keys(probs.ingredients)
    .map(igKey =>
      [...Array(probs.ingredients[igKey])].map((_, i) => (
        <BurgerIngredient key={igKey + i} type={igKey} />
      ))
    )
    .reduce((arr, value) => arr.concat(value), []);
  if (tranformedIngredient.length === 0) {
    tranformedIngredient = <p>Please add ingredient</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {tranformedIngredient}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};
export default burger;
