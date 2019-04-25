const replaceWith = (toReplace, regexPattern, replaceString) => {
	const regex = new RegExp(regexPattern, 'g');
	return toReplace.replace(regex, replaceString);
};
const TRANSCRIPT_DELIMETERS = Object.freeze({
	CUSTOMER: 'Customer: ',
	COLLECTOR: 'Collector: ',
	DETECTING_SPEAKERS: 'Detecting Speakers: '
});
export const splitTranscript = transcript => {
	if (!transcript) {
		return [];
	}

	let splitTranscript = [];

	let tempTranscription = replaceWith(
		transcript,
		TRANSCRIPT_DELIMETERS.CUSTOMER,
		`\n${TRANSCRIPT_DELIMETERS.CUSTOMER}`
	);
	tempTranscription = replaceWith(
		tempTranscription,
		TRANSCRIPT_DELIMETERS.COLLECTOR,
		`\n${TRANSCRIPT_DELIMETERS.COLLECTOR}`
	);
	const finalSplitTranscript = replaceWith(
		tempTranscription,
		TRANSCRIPT_DELIMETERS.DETECTING_SPEAKERS,
		`\n${TRANSCRIPT_DELIMETERS.DETECTING_SPEAKERS}`
	);
	splitTranscript = finalSplitTranscript.split('\n');

	return splitTranscript;
};
