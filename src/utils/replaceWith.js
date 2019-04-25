export const replaceWith = (toReplace, regexPattern, replaceString) => {
  const regex = new RegExp(regexPattern, "g");
  return toReplace.replace(regex, replaceString);
};
