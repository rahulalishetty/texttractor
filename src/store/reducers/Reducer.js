import * as actionTypes from "../actions";

const initialState = {
  call: null,
  contacts: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CONTACTS:
      console.log("contacts", action.payload);
      return {
        ...state,
        contacts: action.payload
      };
    case actionTypes.PLACE_CALL:
      return {
        ...state,
        call: action.payload
      };
    case actionTypes.ADD_NEW_CONTACT:
      return {
        ...state,
        contacts: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
