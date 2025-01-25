// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Backend API URL

// Get all reports
export const getReports = async () => {
    try {
        const response = await axios.get(`${API_URL}/reports`);
        return response.data;
    } catch (error) {
        console.error('Error fetching reports:', error);
        throw error;
    }
};

// Create a new report
export const createReport = async (report) => {
    try {
        const response = await axios.post(`${API_URL}/reports`, report);
        return response.data;
    } catch (error) {
        console.error('Error creating report:', error);
        throw error;
    }
};
