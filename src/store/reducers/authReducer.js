const initialState = {
  isAuthenticated: false,
  loading: true,
  user: null,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'AUTHENTICATION_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        error: null
      };
    case 'LOGIN_FAILURE':
    case 'AUTHENTICATION_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        loading: false, 
        user: null,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: null
      };
    default:
      return state;
  }
};

export default authReducer;
