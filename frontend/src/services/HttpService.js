import axios from "axios";

export default class HttpService {
  static async get(url) {
    return axios.get(url).then((response) => {
      if (response.status < 300) {
        return response.data;
      } else {
        throw new Error(`GET api call returned status code ${response.status}`);
      }
    });
  }

  static async getWithParams(url, params) {
    return axios.get(url, { params }).then((response) => {
      if (response.status < 300) {
        return response.data;
      } else {
        throw new Error(`GET api call returned status code ${response.status}`);
      }
    });
  }

  static async post(url, body) {
    return axios.post(url, body).then((response) => {
      if (response.status < 300) {
        return response.data;
      } else {
        throw new Error(
          `POST api call returned status code ${response.status}`
        );
      }
    });
  }

  static async put(url, body) {
    return axios.put(url, body).then((response) => {
      if (response.status < 300) {
        return response.data;
      } else {
        throw new Error(`PUT api call returned status code ${response.status}`);
      }
    });
  }

  static async del(url) {
    return axios.delete(url).then((response) => {
      if (response.status < 300) {
        return response.data;
      } else {
        throw new Error(
          `DELETE api call returned status code ${response.status}`
        );
      }
    });
  }

  static async delWithBody(url, body) {
    return axios.delete(url, {data: body}).then((response) => {
      if (response.status < 300) {
        return response.data;
      } else {
        throw new Error(
          `DELETE api call returned status code ${response.status}`
        );
      }
    });
  }
}
