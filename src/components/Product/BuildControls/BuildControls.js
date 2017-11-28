import React from 'react';

import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.css';

const controls = [
  { label: 'Bedrooms - $40.00', type: 'one' },
  { label: 'Bathrooms - $40.00', type: 'two' },
  { label: 'Kitchens - $50.00', type: 'three' },
  { label: 'Offices - $30.00', type: 'four' },
  { label: 'Conferences Rooms - $25.00', type: 'five' }
];

const BuildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      Your Total: <strong>${props.total.toFixed(2)}</strong>
    </p>
    {controls.map(control => (
      <BuildControl
        key={control.label}
        label={control.label}
        added={() => props.added(control.type)}
        removed={() => props.removed(control.type)}
        disabled={props.disabled[control.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.hasFeature}
      onClick={props.checkout}
    >
      {props.isAuthenticated ? 'Place Order' : 'Login and Checkout'}
    </button>
  </div>
);

export default BuildControls;
