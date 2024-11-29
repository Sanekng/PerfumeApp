import axios from 'axios';

// Base URL of the API
const API_URL = 'http://localhost:3000/api/perfumes';

// Function to get all perfumes
export const getPerfumes = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // API returns { data: [...perfumes], success: true }
    } catch (error) {
        console.error('Error fetching perfumes:', error);
        throw error;
    }
};

// Function to get a single perfume by ID
export const getPerfumeById = async (perfumeId) => {
    try {
        const response = await axios.get(`${API_URL}/${perfumeId}`);
        return response.data.data; // API returns { data: {...perfume}, success: true }
    } catch (error) {
        console.error('Error fetching perfume by ID:', error.response?.data || error.message); // Log full error response
        throw error;
    }
};

// Create a new perfume
export const createPerfume = async (perfumeData) => {
    try {
        const response = await axios.post(`${API_URL}`, perfumeData);
        return response.data;
    } catch (error) {
        console.error('Error creating perfume:', error);
        throw error;
    }
};

// Update a perfume
export const updatePerfume = async (id, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error updating perfume:', error);
        throw error;
    }
};

// Function to delete a perfume by ID
export const deletePerfume = async (perfumeId) => {
    try {
        const response = await axios.delete(`${API_URL}/${perfumeId}`);
        return response.data; // API returns { message: 'Perfume deleted', success: true }
    } catch (error) {
        console.error('Error deleting perfume:', error);
        throw error;
    }
}

