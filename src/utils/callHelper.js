const ringTone = document.getElementById("ringtone");
let eventSource;

export const isDate = value => {
  return value instanceof Date && !isNaN(value);
};

const prependDigitIfNeeded = val => {
  if (!val) {
    return "";
  }

  return Number(val) < 10 ? `0${val}` : val;
};

const formatDateForUID = date => {
  if (!isDate(date)) {
    return "";
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
    return "";
  }

  const date = new Date();
  const formattedDateInUTC = formatDateForUID(date);
  const finalUID = `OUT-${phoneNumber
    .toString()
    .substring(1)}-${formattedDateInUTC}`;
  console.log("UID", finalUID);
  return finalUID;
};

export const startRingTone = () => {
  try {
    ringTone.crossOrigin = "anonymous";
    ringTone.play();
  } catch (e) {}
};

export const stopRingTone = () => {
  try {
    ringTone.pause();
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
  console.log("STARTING TRANSCRIPTION");
  eventSource = new EventSource(`34.217.60.9${UID}`);
  eventSource.addEventListener("/events?" + UID, e => {
    if (e && e.data) {
      let response = e.data.trim();
      if (response.includes("END_OF_TRANSCRIPTION")) {
        console.log("Ending");
        console.log("closed");
        eventSource.close();

        let finalTranscriptionWithSummary = response.split(
          "END_OF_TRANSCRIPTION"
        );
        console.log(finalTranscriptionWithSummary);
        let transcriptionResponse = finalTranscriptionWithSummary[0]
          ? finalTranscriptionWithSummary[0].trim()
          : "";
        if (
          finalTranscriptionWithSummary.length > 1 &&
          finalTranscriptionWithSummary[1]
        ) {
          let rawSummary = finalTranscriptionWithSummary[1].trim();
          let summaryResponse =
            rawSummary === "{}" ? "[]" : JSON.parse(rawSummary);

          console.log("Summary Received", summaryResponse);
        } else {
        }
      } else {
        //only transcription is coming
      }
    }
  });
};

export const isBusy = sipResponseCode => {
  if (
    sipResponseCode == 486 ||
    sipResponseCode == 603 ||
    sipResponseCode == 600 ||
    sipResponseCode == 503
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
