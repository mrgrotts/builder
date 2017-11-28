import React from 'react';

import classes from './Order.css';

const Order = props => {
  // alternative method to building an array for objects from the method in Product.js
  const features = [];

  // loop over props.features object and push values to features array
  for (let feature in props.features) {
    features.push({ name: feature, quantity: props.features[feature] });
  }

  const orderHistory = features.map(feature => {
    return (
      <span
        key={feature.name}
        style={{
          border: '1px solid #ccc',
          display: 'inline-block',
          margin: '0 8px',
          padding: '5px',
          textTransform: 'capitalize'
        }}
      >
        {feature.name}: {feature.quantity}
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      {orderHistory}
      <p>
        Total: <strong>${Number.parseFloat(props.total).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
