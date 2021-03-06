// frontend/src/store/session.js
import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
    return {
      type: SET_USER,
      payload: user,
    };
  };
  
  const removeUser = () => {
    return {
      type: REMOVE_USER,
    };
  };

  //login user
  export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/users/log-in', {
    
      method: 'POST',
      body: JSON.stringify({
        credential,
        password,
      }),
    });
    const data = await response.json();
    dispatch(setUser(data)); //because i dont have the user attribute  +++
    // dispatch(setUser(data.user));
    return response;
    // return data
};




//restore user
export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    if (Object.values(data).length) {
      dispatch(setUser(data.user))
      return response
    }

    dispatch(setUser(null)); //this set the user initial state to null
    return response;
};

//sign up user
export const signup = (user) => async (dispatch) => {
    const { id, username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        id,
        username,
        firstName,
        lastName,
        email,
        password,
      }),
    });
    
    const data = await response.json();
    dispatch(setUser(data));//+++
    return data;
};

//   log out user
export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
};



const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
