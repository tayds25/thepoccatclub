import axios from 'axios';

// Base API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

// Axios instance with default configuration
export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// For file uploads (multipart/form-data)
export const uploadClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

// Helper for standard GET requests
export const fetchData = async (endpoint) => {
    try {
        const response = await apiClient.get(endpoint);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        throw error;
    }
};

// Helper for standard POST requests
export const postData = async (endpoint, data) => {
    try {
        const response = await apiClient.post(endpoint, data);
        return response.data;
    } catch (error) {
        console.error(`Error posting data to ${endpoint}:`, error);
        throw error;
    }
};

// Helper for file uploads
export const uploadFile = async (endpoint, formData) => {
    try {
        const response = await uploadClient.post(endpoint, formData);
        return response.data;
    } catch (error) {
        console.error(`Error uploading file to ${endpoint}:`, error);
        throw error;
    }
};

// Helper for standard PATCH requests
export const updateData = async (endpoint, data) => {
    try {
        const response = await apiClient.patch(endpoint, data);
        return response.data;
    } catch (error) {
        console.error(`Error updating data at ${endpoint}:`, error);
        throw error;
    }
};

// Helper for file upload PATCH requests
export const updateWithFile = async (endpoint, formData) => {
    try {
        const response = await uploadClient.patch(endpoint, formData);
        return response.data;
    } catch (error) {
        console.error(`Error updating with file at ${endpoint}:`, error);
        throw error;
    }
};

// Helper for standard DELETE requests
export const deleteData = async (endpoint) => {
    try {
        const response = await apiClient.delete(endpoint);
        return response.data;
    } catch (error) {
        console.error(`Error deleting data at ${endpoint}:`, error);
        throw error;
    }
};

// Helper to get full asset URL (for images, etc.)
export const getAssetUrl = (path) => {
    if (!path) return null;
    // If path already includes http/https, return as is
    if (path.startsWith('http')) return path;
    // Otherwise, prepend the API URL
    return `${API_URL}${path}`;
};