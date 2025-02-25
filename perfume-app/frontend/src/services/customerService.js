import axios from 'axios';

const baseURL = 'http://localhost:3000/api/customers';

export const createCustomer = (data) => axios.post(baseURL, data).then((res) => res.data);
export const getCustomers = () => axios.get(baseURL).then((res) => res.data.data);
export const getCustomerById = (id) => axios.get(`${baseURL}/${id}`).then((res) => res.data.data);
export const updateCustomer = (id, data) => axios.put(`${baseURL}/${id}`, data).then((res) => res.data);
export const deleteCustomer = (id) => axios.delete(`${baseURL}/${id}`).then((res) => res.data);