import axios from "axios";

import { BASE } from "../constants/restEndPoints";

export const cscInstance = axios.create({
  baseURL: "https://api.countrystatecity.in/v1/",
  headers: {
    "X-CSCAPI-KEY": "a1pZdWUxNk9wbmFrcnNHWlJPYnNpanhvQVhyenN0c0NFeFZPNENxcA==",
  },
});

const instance = axios.create({
  baseURL: BASE,
});

export default instance;
