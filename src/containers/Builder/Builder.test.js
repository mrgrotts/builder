import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Builder } from './Builder';
import BuildControls from '../../components/Product/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

describe('<Builder />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Builder initFeatures={() => {}} />);
  });

  it('should render <BuildControls /> when receiving features', () => {
    wrapper.setProps({ features: { one: 1 } });

    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
