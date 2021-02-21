import React from 'react';
import classes from './BuildControl.module.css';
const buildControl = probs => (
  <div className={classes.BuidControl}>
    <div className={classes.Label}>{probs.label}</div>
    <button
      className={classes.Less}
      onClick={probs.deleted}
      disabled={probs.disabled}
    >
      Less
    </button>
    <button className={classes.More} onClick={probs.added}>
      More
    </button>
  </div>
);
export default buildControl;
