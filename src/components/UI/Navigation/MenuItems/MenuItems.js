import React from 'react';

import MenuItem from './MenuItem/MenuItem';

import classes from './MenuItems.css';

const MenuItems = props => (
  <ul className={classes.MenuItems}>
    <MenuItem exact link="/">
      Builder
    </MenuItem>

    {props.isAuthenticated ? <MenuItem link="/orders">Orders</MenuItem> : null}

    {props.isAuthenticated ? (
      <MenuItem link="/logout">Logout</MenuItem>
    ) : (
      <MenuItem link="/login">Login</MenuItem>
    )}
  </ul>
);

export default MenuItems;
