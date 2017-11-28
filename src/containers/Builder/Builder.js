import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-firebase';

import Auxiliary from '../../hoc/Auxiliary';
import handleErrors from '../../hoc/handleErrors/handleErrors';

import Product from '../../components/Product/Product';
import BuildControls from '../../components/Product/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Review from '../../components/Product/Review/Review';

import * as actions from '../../actions';

// export (but not as default) for testing purposes
export class Builder extends Component {
  state = {
    showCheckout: false
  };

  componentDidMount() {
    this.props.initFeatures();
    // console.log(this.props.features);
  }

  updateFeatures(features) {
    const sum = Object.keys(features)
      .map(featureKey => {
        // console.log(features[featureKey]);
        return features[featureKey];
      })
      .reduce((sum, element) => {
        return sum + element;
      }, 0);

    return sum > 0;
  }

  startCheckout = () => {
    if (this.props.isAuthenticated) {
      this.setState({ showCheckout: true });
    } else {
      this.props.authRedirectPath('/checkout');
      this.props.history.push('/login');
    }
  };

  cancelCheckout = () => {
    this.setState({ showCheckout: false });
  };

  continueCheckout = () => {
    this.props.orderInit();
    this.props.history.push('/checkout');
  };

  render() {
    const disabledFeatures = {
      ...this.props.features
    };

    // immutable way to perform check if each key's value is <= limit
    // returns object similar to { one: true, two: false, ... }
    for (let key in disabledFeatures) {
      disabledFeatures[key] = disabledFeatures[key] <= 0;
    }

    let review = null;

    let product = this.props.error ? (
      <p>Features can't be loaded.</p>
    ) : (
      <Spinner />
    );

    if (this.props.features) {
      product = (
        <Auxiliary>
          <Product features={this.props.features} />
          <BuildControls
            isAuthenticated={this.props.isAuthenticated}
            added={this.props.addFeature}
            removed={this.props.removeFeature}
            disabled={disabledFeatures}
            hasFeature={this.updateFeatures(this.props.features)}
            total={this.props.total}
            checkout={this.startCheckout}
          />
        </Auxiliary>
      );
      review = (
        <Review
          features={this.props.features}
          total={this.props.total}
          continue={this.continueCheckout}
          cancel={this.cancelCheckout}
        />
      );
    }

    return (
      <Auxiliary>
        <Modal show={this.state.showCheckout} closeModal={this.cancelCheckout}>
          {review}
        </Modal>
        {product}
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => ({
  features: state.builder.features,
  total: state.builder.total,
  error: state.builder.error,
  ordered: state.order.ordered,
  isAuthenticated: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  authRedirectPath: path => dispatch(actions.authRedirectPath(path)),
  initFeatures: () => dispatch(actions.initFeatures()),
  addFeature: feature => dispatch(actions.addFeature(feature)),
  removeFeature: feature => dispatch(actions.removeFeature(feature)),
  orderInit: () => dispatch(actions.orderInit())
});

export default connect(mapStateToProps, mapDispatchToProps)(
  handleErrors(Builder, axios)
);
