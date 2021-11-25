import axios from "axios";

export default class HttpService {
  static async get(url) {
    return axios.get(url).then((response) => {
      if (response.status < 300) {
        return response.data;
      } else {
        throw new Error('GET got error');
      }
    }).catch(err => {
      this.handleError(err)
    });
  }

  static async post(url, body) {
    return axios.post(url, body)
      .then(response => {
        if (response.status < 300) {
          return response.data;
        } else {
          throw new Error("POST Api call didn't return status code 200");
        }
      })
      .catch(err => {
        this.handleError(err);
      });
  }

  static async put(url, body) {
    return axios.put(url, body)
      .then(response => {
        if (response.status < 300) {
          return response.data;
        } else {
          throw new Error("PUT Api call didn't return status code 200");
        }
      })
      .catch(err => {
        this.handleError(err);
      });
  }

  static async del(url) {
    return axios.delete(url)
      .then(response => {
        if (response.status < 300) {
          return response.data;
        } else {
          throw new Error("PUT Api call didn't return status code 200");
        }
      })
      .catch(err => {
        this.handleError(err);
      })
  }

  static handleError(error) {
    console.err(error);
  }
}