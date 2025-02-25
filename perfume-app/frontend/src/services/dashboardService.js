import axios from 'axios';

const baseURL = 'http://localhost:3000/api/dashboard';

export const viewSummary = () => axios.get(baseURL+"/summary").then((res) => res.data.data);
export const viewActivities = () => axios.get(baseURL+"/activities").then((res) => res.data.data);