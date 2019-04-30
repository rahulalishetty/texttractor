import * as actionTypes from '../actions';
import { sipHangup } from '../../utils/sipUtils';

const initialState = {
	call: null,
	onGoingCall: false,
	phoneNumber: null,
	callerName: null,
	transcript: null,
	startTimer: false,
	summary: null,
	duration: null,
	summaryFailed: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PLACE_CALL:
			return {
				...state,
				call: action.payload,
				onGoingCall: true,
				phoneNumber: action.payload.phone,
				callerName: action.payload.name
			};
		case actionTypes.GOTO_HOME:
			sipHangup();
			return {
				...state,
				call: null,
				onGoingCall: false,
				summary: null,
				duration: null,
				summaryFailed: false,
				date: null,
				time: null
			};
		case actionTypes.END_CALL:
			sipHangup();
			return {
				...state,
				onGoingCall: false
			};
		case actionTypes.STORE_TRANSCRIPTION:
			console.log('in store', action.payload);
			return {
				...state,
				transcript: action.payload
			};
		case actionTypes.STORE_SUMMARY:
			console.log('store summary', action.payload);
			return {
				...state,
				summary: action.payload
			};
		case actionTypes.SET_DURATION:
			console.log('reducer', action.payload);
			return {
				...state,
				duration: action.payload
			};
		case actionTypes.SUMMARY_FAILED:
			return {
				...state,
				summaryFailed: true
			};
		case actionTypes.START_TIMER:
			return {
				...state,
				startTimer: true
			};
		default:
			return state;
	}
};

export default reducer;

// [
//   {
//     confidence: "",
//     intent: "small_talk1",
//     summary: "small talk"
//   },
//   {
//     confidence: "",
//     intent: "small_talk2",
//     summary: "small talk"
//   },
//   {
//     confidence: "",
//     intent: "small_talk3",
//     summary: "small talk"
//   }
// ];
