import * as actionTypes from '../actions';
import { sipHangup } from '../../utils/sipUtils';

const initialState = {
	call: null,
	onGoingCall: false,
	phoneNumber: null,
	callerName: null,
	transcript: null,
	summary: null,
	duration: null,
	startTimer: false,
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
				startTimer: false,
				transcript: null,
				summaryFailed: false
			};
		case actionTypes.END_CALL:
			sipHangup();
			return {
				...state,
				onGoingCall: false,
				startTimer: false
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
		case actionTypes.START_TIMER:
			return {
				...state,
				startTimer: true
			};
		case actionTypes.SUMMARY_FAILED:
			return {
				...state,
				summaryFailed: true
			};
		default:
			return state;
	}
};

export default reducer;
