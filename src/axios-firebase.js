import axios from "axios";

const instance = axios.create({
  baseURL: "https://texttractive.firebaseio.com/"
});

export default instance;
