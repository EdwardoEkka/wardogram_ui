import { EDIT_FINISH } from "../actions/editActions";

const initialState = {
    isFinished: false,
  };

  const editReducer = (state = initialState, action) => {
    switch (action.type) {
      case EDIT_FINISH:
        return {
          ...state,
          isFinished: action.payload,
        };
      default:
        return state;
    }
  };

  export default editReducer;