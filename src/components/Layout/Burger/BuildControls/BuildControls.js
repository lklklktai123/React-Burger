import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';
const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];
const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      Current price:<strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map(ctr => (
      <BuildControl
        key={ctr.label}
        label={ctr.label}
        added={() => props.ingredientsAdded(ctr.type)}
        deleted={() => props.ingredientRemove(ctr.type)}
        disabled={props.disabled[ctr.type]}
      />
    ))}
    <button disabled={!props.purchaseable} onClick={props.ordered}>
      {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
    </button>
  </div>
);
export default buildControls;
