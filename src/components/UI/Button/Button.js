import React from 'react';
import classes from './Button.module.css';
const button = probs => (
  <button
    className={[classes.Button, classes[probs.btnType]].join(' ')}
    onClick={probs.clicked}
    disabled={probs.disabled}
  >
    {probs.children}
  </button>
);
export default button;
