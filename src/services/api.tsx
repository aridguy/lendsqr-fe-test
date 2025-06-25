import axios from 'axios';

const API_URL = 'https://raw.githubusercontent.com/aridguy/users/main/userData.json';

export const fetchUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};