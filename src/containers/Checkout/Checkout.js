import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Customer from './Customer/Customer';

import OrderSummary from '../../components/Order/OrderSummary/OrderSummary';

class Checkout extends Component {
  continueCheckout = () => {
    this.props.history.replace('/checkout/customer-data');
  };

  cancelCheckout = () => {
    this.props.history.goBack();
  };

  render() {
    let summary = <Redirect to="/" />;

    if (this.props.features) {
      const redirectAfterOrder = this.props.ordered ? (
        <Redirect to="/" />
      ) : null;

      summary = (
        <div>
          {redirectAfterOrder}
          <OrderSummary
            features={this.props.features}
            continue={this.continueCheckout}
            cancel={this.cancelCheckout}
          />
          <Route
            path={this.props.match.path + '/customer-data'}
            component={Customer}
          />
        </div>
      );
    }

    return summary;
  }
}

const mapStateToProps = state => ({
  features: state.builder.features,
  ordered: state.order.ordered
});

export default connect(mapStateToProps)(Checkout);
