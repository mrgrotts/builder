import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-firebase';

import handleErrors from '../../hoc/handleErrors/handleErrors';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../actions';

class Orders extends Component {
  componentDidMount() {
    const { id, token, fetchOrders } = this.props;
    fetchOrders(token, id);
  }

  render() {
    let orders = <Spinner />;

    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order key={order.id} features={order.features} total={order.total} />
      ));
    }

    return <div>{orders}</div>;
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  id: state.auth.id,
  token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  fetchOrders: (token, id) => dispatch(actions.fetchOrders(token, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  handleErrors(Orders, axios)
);
