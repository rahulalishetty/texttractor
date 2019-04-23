import * as actionTypes from "../actions";

const initialState = {
  call: null,
  contacts: null,
  onGoingCall: false,
  phoneNumber: null
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
        call: action.payload,
        onGoingCall: true,
        phoneNumber: action.payload.phone
      };
    case actionTypes.ADD_NEW_CONTACT:
      return {
        ...state,
        contacts: action.payload
      };
    case actionTypes.GOTO_HOME:
      console.log("go home");
      return {
        ...state,
        call: null,
        onGoingCall: false
      };
    case actionTypes.END_CALL:
      return {
        ...state,
        onGoingCall: false
      };
    default:
      return state;
  }
};

export default reducer;
