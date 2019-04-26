import * as actionTypes from "../actions";
import { sipHangup } from "../../utils/sipUtils";

const initialState = {
  call: null,
  contacts: null,
  onGoingCall: false,
  phoneNumber: null,
  showModal: false,
  callerName: null,
  transcript: null,
  summary: null
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
        phoneNumber: action.payload.phone,
        callerName: action.payload.name
      };
    case actionTypes.ADD_NEW_CONTACT:
      return {
        ...state,
        contacts: action.payload
      };
    case actionTypes.GOTO_HOME:
      sipHangup();
      return {
        ...state,
        call: null,
        onGoingCall: false,
        summary: null
      };
    case actionTypes.END_CALL:
      sipHangup();
      return {
        ...state,
        onGoingCall: false
      };
    case actionTypes.STORE_TRANSCRIPTION:
      console.log("in store", action.payload);
      return {
        ...state,
        transcript: action.payload
      };
    case actionTypes.STORE_SUMMARY:
      console.log("store summary", action.payload);
      return {
        ...state,
        summary: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
