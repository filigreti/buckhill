import axios from "axios";

let API_URL = "https://godscaremissions.herokuapp.com/api/v1";

// request interceptor
// request interceptor
// instance.interceptors.request.use(
//   (config, reqAuth) => {
//     // do somethong here
//     return config;
//   },
//   error => {}
// );

class Api {
  static async get(url, requireAuth = false) {
    try {
      let config = {
        headers: {
          Authorization: `Token ${localStorage.getItem("access_token")}`,
        },
      };
      let response = requireAuth
        ? await axios.get(API_URL + url, config)
        : await axios.get(API_URL + url);
      return response.data;
    } catch (error) {
      return error.response;
    }
  }

  static async post(url, payload, requireAuth = false) {
    try {
      let config = {
        headers: {
          Authorization: `Token ${localStorage.getItem("access_token")}`,
        },
      };
      let response = requireAuth
        ? await axios.post(API_URL + url, payload, config)
        : await axios.post(API_URL + url, payload);
      return response;
    } catch (error) {
      console.log(error.response);
      return error.response;
    }
  }

  static async put(url, payload = {}, requireAuth = false) {
    try {
      let config = {
        headers: {
          Authorization: `Token ${localStorage.getItem("access_token")}`,
        },
      };
      let response = requireAuth
        ? await axios.put(API_URL + url, payload, config)
        : await axios.put(API_URL + url, payload);
      return response;
    } catch (error) {
      return error.response;
    }
  }

  static async delete(url, requireAuth = true) {
    try {
      let config = {
        headers: {
          Authorization: `Token ${localStorage.getItem("access_token")}`,
        },
      };
      let response = requireAuth
        ? await axios.delete(API_URL + url, config)
        : await axios.delete(API_URL + url);
      return response;
    } catch (error) {
      return error.response;
    }
  }
}

export default Api;
