import axios from 'axios';

const httpRequest = axios.create({
  baseURL: "https://trackscan-be.azurewebsites.net",
});

export const get = async (path, options = {}) => {
  const response = await httpRequest.get(path, options);
  return response.data;
};

export const post = async (path, body, options = {}) => {
  const response = await httpRequest.post(path, body, options);
  return response.data;
};

export const _delete = async (path, body, options = {}) => {
  const response = await httpRequest.delete(path, body, options);
  return response.data;
};

export default httpRequest;
