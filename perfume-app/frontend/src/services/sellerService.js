import axios from 'axios';

const API_URL = 'http://localhost:3000/api/sellers';

// Fetch sellers
export const getSellers = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching sellers:', error);
        throw error;
    }
};

// Get a single seller by ID
export const getSellerById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        console.log('API Response:', response.data);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching seller:', error);
        throw error;
    }
};

// Create a new seller
export const createSeller = async (sellerData) => {
    try {
        const response = await axios.post(`${API_URL}`, sellerData);
        console.log('Seller created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating seller:', error.response?.data || error);
        throw error;
    }
};

// Update a seller
export const updateSeller = async (id, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error updating seller:', error);
        throw error;
    }
};

// Delete a seller by ID
export const deleteSeller = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data; // API returns { message: 'Seller deleted', success: true }
    } catch (error) {
        console.error('Error deleting seller:', error);
        throw error;
    }
}


