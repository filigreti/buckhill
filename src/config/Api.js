import axios from "axios";

let API_URL = "https://pet-shop.buckhill.com.hr/api/v1";

class Api {
  static async get(url, requireAuth = false) {
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      };
      let response = requireAuth
        ? await axios.post(API_URL + url, payload, config)
        : await axios.post(API_URL + url, payload);
      return response;
    } catch (error) {
      return error.response;
    }
  }

  static async put(url, payload = {}, requireAuth = false) {
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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

  static async blob(url) {
    try {
      let config = {
        responseType: "blob",
      };
      let response = await axios.get(API_URL + url, config);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default Api;
