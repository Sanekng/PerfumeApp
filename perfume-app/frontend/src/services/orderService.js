import axios from 'axios';

const baseURL = 'http://localhost:3000/api/orders';

export const createOrder = (data) => axios.post(baseURL, data).then((res) => res.data);
export const getOrders = () => axios.get(baseURL).then((res) => res.data.data); // Extract `data` field
export const getOrderById = (id) => axios.get(`${baseURL}/${id}`).then((res) => res.data.data);
export const updateOrder = (id, data) => axios.put(`${baseURL}/${id}`, data).then((res) => res.data);
export const deleteOrder = (id) => axios.delete(`${baseURL}/${id}`).then((res) => res.data);
