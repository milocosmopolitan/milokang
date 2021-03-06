import axios from 'axios'

const AUTHENTICATED = 'AUTHENTICATED';

export default (state=null, action) => {
  switch(action.type) {
  case AUTHENTICATED:
    return action.user;
  }
  return state;
};

export const authenticated = user => ({
  type: AUTHENTICATED, user
});

export const login = (username, password) =>
  dispatch =>
    axios.post('/api/auth/login/local',
      {username, password})
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()));

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()));

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data;
        // console.log('whoami',response, response.data);
        dispatch(authenticated(user));
      })
      .catch(failed => dispatch(authenticated(null)));
