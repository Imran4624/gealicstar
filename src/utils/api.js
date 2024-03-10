import axios from "axios";
const baseUrl = "https://gaelicstar.devsgenus.com/";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
const headers1 ={ 
  'Content-Type': 'application/x-www-form-urlencoded'
};

const api = axios.create({
  baseURL: baseUrl,
  headers,
});
const apiCreate = axios.create({
  baseURL: baseUrl,
  headers1,
});
export const GetRequest = async (url) => {
  try {
    const response = await api.get(url);
    if (response.data.success) {
      const data = { status: true, error: null, data: response.data.data };
      return data;
    } else {
      const data = { status: false, error: null, data: null };
      return data;
    }
  } catch (error) {
    const data = { status: false, error: error, data: null };
    return data;
  }
};
export const PostRequest = async (url, data) => {
  try {
    const response = await api.post(url, data);
    if (response.data.success) {
      const data = { status: true, error: null, data: response.data.data };
      return data;
    } else {
      const data = { status: false, error: null, data: null };
      return data;
    }
  } catch (error) {
    const data = { status: false, error: error, data: null };
    return data;
  }
};
export const CreatePostRequest = async (url, data) => {
  // const dataCall = JSON.stringify(data)
  try {
    const response = await apiCreate.post(url, data);
    console.log("api responce : ",response);
    if (response.data.success) {
      const data = { status: true, error: null, data: response.data };
      return data;
    } else {
      const data = { status: false, error: null, data: null };
      return data;
    }
  } catch (error) {
    const data = { status: false, error: error, data: null };
    return data;
  }
};

export default api;
