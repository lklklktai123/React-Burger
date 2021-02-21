import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';
const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];
const buildControls = probs => (
  <div className={classes.BuildControls}>
    <p>
      Current price:<strong>{probs.price.toFixed(2)}</strong>
    </p>
    {controls.map(ctr => (
      <BuildControl
        key={ctr.label}
        label={ctr.label}
        added={() => probs.ingredientsAdded(ctr.type)}
        deleted={() => probs.ingredientRemove(ctr.type)}
        disabled={probs.disabled[ctr.type]}
      />
    ))}
    <button disabled={!probs.purchaseable} onClick={probs.ordered}>
      ORDER NOW
    </button>
  </div>
);
export default buildControls;
