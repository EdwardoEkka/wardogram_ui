import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/users/login`, { email, password });
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
    localStorage.setItem('authToken', response.data.token);
    dispatch(fetchCurrentUser(response.data.token));
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data });
  }
};

export const register = (username, password) => async (dispatch) => {
  try {
    await axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/users/register`, { username, password });
    dispatch({ type: 'REGISTER_SUCCESS' });
  } catch (error) {
    dispatch({ type: 'REGISTER_FAILURE', payload: error.response.data });
  }
};

export const fetchCurrentUser = (token) => async (dispatch) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/users/get-user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch({ type: 'AUTHENTICATION_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'AUTHENTICATION_FAILURE', payload: error.response.data });
  }
};
