import React, { Component } from 'react';

import Auxiliary from '../../../hoc/Auxiliary';

import Button from '../../UI/Button/Button';

class Review extends Component {
  render() {
    const featureSelections = Object.keys(
      this.props.features
    ).map(featureKey => {
      return (
        <li key={featureKey}>
          <span style={{ textTransform: 'capitalize' }}>{featureKey}</span>:{' '}
          {this.props.features[featureKey]}
        </li>
      );
    });

    return (
      <Auxiliary>
        <h3>Your Order</h3>
        <p>Please review your product features selections.</p>
        <ul>{featureSelections}</ul>
        <p>
          <strong>Total Price: ${this.props.total.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout</p>
        <Button clicked={this.props.cancel} ButtonType="Failure">
          Cancel
        </Button>
        <Button clicked={this.props.continue} ButtonType="Success">
          Continue
        </Button>
      </Auxiliary>
    );
  }
}

export default Review;
