const initialState = {
  darkMode:false
};


const dark_Mode_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BACKGROUND_MODE':
      return {
        ...state,
        darkMode:!state.darkMode,
      };
    default:
      return state;
  }
};

export default dark_Mode_Reducer;