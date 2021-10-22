import axios from "axios";

import { BASE } from "../constants/restEndPoints";

const instance = axios.create({
  baseURL: BASE,
});

export default instance;
