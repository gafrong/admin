import axios from 'axios';

const baseURL = 'http://localhost:3001/api/v1/';
const api = axios.create({ baseURL });

export const createVendorSupportQuery = async (data) => {
  const response = await api.post('vendor-support-query/', data);
  return response.data;
};

export const getVendorSupportQueries = async (userId) => {
  const response = await api.get(`vendor-support-query/user/${userId}`);
  return response.data;
};

export const getVendorSupportQuery = async (id) => {
  const response = await api.get(`vendor-support-query/${id}`);
  return response.data;
};

export const updateVendorSupportQuery = async (id, data) => {
  const response = await api.put(`vendor-support-query/${id}`, data);
  return response.data;
};

export const deleteVendorSupportQuery = async (id) => {
  const response = await api.delete(`vendor-support-query/${id}`);
  return response.data;
};

export const addMessageToVendorSupportQuery = async (id, data) => {
  const response = await api.post(`vendor-support-query/${id}/messages`, data);
  return response.data;
};

export const getMessagesForVendorSupportQuery = async (id) => {
  const response = await api.get(`vendor-support-query/${id}/messages`);
  return response.data;
};
