import axios from "axios";

// Implements axios adapter for requests
const Api = (_callbackFn = (inst) => inst) => {
  const createdInst = axios.create({ baseURL: process.env.REACT_APP_API_URL, });
   
  return _callbackFn(createdInst);
}

export default Api;
