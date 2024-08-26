import axios from 'axios';

export const fetchLeetCodeData = async (username) => {
  try {
    const response = await axios.get(`https://leetcode-stats-api.herokuapp.com/${username}`);
    if (response.data.status === 'error') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching LeetCode data:', error);
    throw error; 
  }
};


