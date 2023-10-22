import axios from "axios";
import { baseApiUrl } from "@helpers/constants";

axios.defaults.baseURL = baseApiUrl;

export default axios;
