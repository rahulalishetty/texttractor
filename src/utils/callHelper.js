import { store } from '../index';
import * as actionTypes from '../store/actions';

const ringtone = document.getElementById('ringtone');
let eventSource;

export const isDate = value => {
	return value instanceof Date && !isNaN(value);
};

const prependDigitIfNeeded = val => {
	if (!val) {
		return '';
	}

	return Number(val) < 10 ? `0${val}` : val;
};

const formatDateForUID = date => {
	if (!isDate(date)) {
		return '';
	}

	const UTCDate = prependDigitIfNeeded(date.getUTCDate());
	const UTCMonth = prependDigitIfNeeded(date.getUTCMonth());
	const UTCYear = date.getUTCFullYear();
	const UTCSeconds = prependDigitIfNeeded(date.getUTCSeconds());
	const UTCMinutes = prependDigitIfNeeded(date.getUTCMinutes());
	const UTCHours = prependDigitIfNeeded(date.getUTCHours());

	return `${UTCDate}${UTCMonth}${UTCYear}-${UTCHours}:${UTCMinutes}:${UTCSeconds}`;
};

export const generateUID = phoneNumber => {
	// const time = Math.round(new Date().getTime() / 1000);
	if (!phoneNumber) {
		return '';
	}

	const date = new Date();
	const formattedDateInUTC = formatDateForUID(date);
	const finalUID = `OUT-${phoneNumber
		.toString()
		.substring(1)}-${formattedDateInUTC}`;
	console.log('UID', finalUID);
	return finalUID;
};

export const startRingTone = () => {
	try {
		ringtone.crossOrigin = 'anonymous';
		ringtone.play();
	} catch (e) {}
};

export const stopRingTone = () => {
	try {
		ringtone.pause();
	} catch (e) {}
};

export const startRingbackTone = () => {
	try {
		// ringbacktone.play();
	} catch (e) {}
};

export const stopRingbackTone = () => {
	try {
		// ringbacktone.pause();
	} catch (e) {}
};

export const startTranscription = UID => {
	console.log('STARTING TRANSCRIPTION');
	store.dispatch({ type: actionTypes.START_TIMER });
	eventSource = new EventSource(`http://34.217.60.9:5000/events?${UID}`);
	eventSource.addEventListener('/events?' + UID, e => {
		if (e && e.data) {
			let response = e.data.trim();
			if (response.includes('END_OF_TRANSCRIPTION')) {
				console.log('Ending');
				console.log('closed');
				eventSource.close();

				let finalTranscriptionWithSummary = response.split(
					'END_OF_TRANSCRIPTION'
				);
				store.dispatch({
					type: actionTypes.STORE_TRANSCRIPTION,
					payload: finalTranscriptionWithSummary[0].trim()
				});
				// console.log('final:::', finalTranscriptionWithSummary[0]);
				let transcriptionResponse = finalTranscriptionWithSummary[0]
					? finalTranscriptionWithSummary[0].trim()
					: '';
				if (
					finalTranscriptionWithSummary.length > 1 &&
					finalTranscriptionWithSummary[1]
				) {
					let rawSummary = finalTranscriptionWithSummary[1].trim();
					let summaryResponse =
						rawSummary === '{}' ? '[]' : JSON.parse(rawSummary);
					store.dispatch({
						type: actionTypes.STORE_SUMMARY,
						payload: summaryResponse
					});
					store.dispatch({
						type: actionTypes.END_CALL
					});
					console.log('Intent: ', summaryResponse);
					// console.log('Summary: ', summaryResponse[0].summary);
				} else {
					console.log('summary failed');
					store.dispatch({
						type: actionTypes.SUMMARY_FAILED
					});
				}
			} else {
				store.dispatch({
					type: actionTypes.STORE_TRANSCRIPTION,
					payload: e.data.trim()
				});
			}
		}
	});
};

export const isBusy = sipResponseCode => {
	if (
		sipResponseCode === 486 ||
		sipResponseCode === 603 ||
		sipResponseCode === 600 ||
		sipResponseCode === 503
	) {
		return true;
	}

	return false;
};

export const doCallEndThings = (e, UID) => {
	const iSipResponseCode = e.getSipResponseCode();
	if (isBusy(e.getSipResponseCode())) {
		//show user is busy status
	} else if (!(e.getSipResponseCode() >= 400 && !isBusy(iSipResponseCode))) {
		//call ended
	}

	// reEnableButtonPostCall();
};
