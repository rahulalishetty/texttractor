import { TRANSCRIPT_DELIMETERS } from "./TRANSCRIPT_DELIMETERS";
import { replaceWith } from "./replaceWith";

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

  splitTranscript = finalSplitTranscript.split("\n");

  return splitTranscript;
};
