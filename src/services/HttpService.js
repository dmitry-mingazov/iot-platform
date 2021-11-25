import axios from "axios";

export async function get(url) {
  const response = await axios.get(url);
  if (response.status === 200) {
    return await response.data;
  } else {
    throw new Error("GET Api call didn't return status code 200");
  }
}

export async function post(url, jsonObject) {
  const response = await axios.post(url, jsonObject);
  if (response.status === 200) {
    return await response.data;
  } else {
    throw new Error("POST Api call didn't return status code 200");
  }
}

export async function put(url, jsonObject) {
  const response = await axios.put(url, jsonObject);
  if (response.status === 200) {
    return await response.data;
  } else {
    throw new Error("PUT Api call didn't return status code 200");
  }
}

export async function del(url) {
  const response = await axios.delete(url);
  if (response.status === 200) {
    return await response.data;
  } else {
    throw new Error("DELETE Api call didn't return status code 200");
  }
}
