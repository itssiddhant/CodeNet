import axios from 'axios';

const GFG_API_URL = 'https://geeks-for-geeks-stats-api.vercel.app'; 

export const fetchGeeksForGeeksData = async (username) => {
  try {
    const response = await axios.get(`${GFG_API_URL}/?raw=Y&userName=${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching GeeksforGeeks data:', error);
    return null;
  }
};
