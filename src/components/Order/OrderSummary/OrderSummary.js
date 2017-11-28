import React from 'react';

import Product from '../../Product/Product';
import Button from '../../UI/Button/Button';

import classes from './OrderSummary.css';

const OrderSummary = props => {
  return (
    <div className={classes.OrderSummary}>
      <h1>Order Details</h1>
      <div style={{ margin: 'auto', width: '100%' }}>
        <Product features={props.features} />
      </div>
      <Button ButtonType="Failure" clicked={props.cancel}>
        Cancel
      </Button>
      <Button ButtonType="Success" clicked={props.continue}>
        Continue
      </Button>
    </div>
  );
};

export default OrderSummary;
