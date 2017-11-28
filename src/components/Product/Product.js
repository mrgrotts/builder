import React from 'react';

import Feature from './Features/Feature';

import classes from './Product.css';

const Product = props => {
  const staticTypes = ['top', 'bottom'];

  let transformedFeatures = Object.keys(props.features)
    .map(featureKey => {
      return [...Array(props.features[featureKey])] // returns [ , ]
        .map((item, index) => {
          return <Feature key={featureKey + index} type={featureKey} />;
        });
    })
    // flatten array of arrays
    .reduce((array, element) => {
      // add element to array
      return array.concat(element);
    }, []);
  // console.log(transformedFeatures);

  if (transformedFeatures.length === 0) {
    transformedFeatures = <p>Please add optional features to your Order.</p>;
  }

  return (
    <div className={classes.Product}>
      FEATURE 1
      <Feature type={staticTypes[0]} />
      FEATURE 2
      <Feature type={staticTypes[1]} />
      {transformedFeatures}
    </div>
  );
};

export default Product;
