import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MenuItems from './MenuItems';
import MenuItem from './MenuItem/MenuItem';

configure({ adapter: new Adapter() });

describe('<MenuItems />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<MenuItems />);
  });

  it('should render 2 menu items if not authenticated', () => {
    expect(wrapper.find(MenuItem)).toHaveLength(2);
  });

  it('should render 3 menu items if authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });

    expect(wrapper.find(MenuItem)).toHaveLength(3);
  });

  it('should render logout menu item if authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });

    expect(
      wrapper.contains(<MenuItem link="/logout">Logout</MenuItem>)
    ).toEqual(true);
  });
});
