import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Feature.css';

export default class Feature extends Component {
  render() {
    let feature = null;

    switch (this.props.type) {
      case 'top':
        feature = <div className={classes.Top} />;
        break;
      case 'bottom':
        feature = <div className={classes.Bottom} />;
        break;
      case 'one':
        feature = <div className={classes.One} />;
        break;
      case 'two':
        feature = <div className={classes.Two} />;
        break;
      case 'three':
        feature = <div className={classes.Three} />;
        break;
      case 'four':
        feature = <div className={classes.Four} />;
        break;
      case 'five':
        feature = <div className={classes.Five} />;
        break;
      default:
        feature = null;
    }

    return feature;
  }
}

Feature.propTypes = {
  type: PropTypes.string.isRequired
};
