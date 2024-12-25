import axios from 'axios';

// Base URL of backend API
const BASE_URL = 'http://127.0.0.1:5000'; 


export const fetchVerse = async (language) => {
  try {
    const response = await axios.get(`${BASE_URL}/daily-verse?Language=${language}`);
    return response.data.result;
  } catch (error) {
    console.error('Error fetching verse:', error);
    throw new Error('Failed to fetch the daily verse.');
  }
};
