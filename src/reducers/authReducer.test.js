import reducer from './authReducer';

import * as actions from '../actions';

describe('authReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      id: null,
      token: null,
      error: null,
      loading: false,
      redirectPath: '/'
    });
  });

  it('should store the token after login', () => {
    expect(
      reducer(
        {
          id: null,
          token: null,
          error: null,
          loading: false,
          redirectPath: '/'
        },
        { type: actions.AUTH_SUCCESS, token: 'testtoken', id: 'testid' }
      )
    ).toEqual({
      id: 'testid',
      token: 'testtoken',
      error: null,
      loading: false,
      redirectPath: '/'
    });
  });
});
