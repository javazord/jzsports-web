import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;

const httpClient = axios.create({
  baseURL: baseURL,
  withCredentials: false,
});

export default class ApiService {
  constructor(apiURL) {
    this.apiURL = apiURL;
  }

  post(url, obj) {
    const request = `${this.apiURL}${url}`;
    return httpClient.post(request, obj);
  }

  put(url, obj) {
    const request = `${this.apiURL}${url}`;
    return httpClient.put(request, obj);
  }

  delete(url) {
    const request = `${this.apiURL}${url}`;
    return httpClient.delete(request);
  }

  get(url) {
    const request = `${this.apiURL}${url}`;
    return httpClient.get(request);
  }
}
