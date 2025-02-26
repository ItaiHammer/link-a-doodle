import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const shortenUrl = async (originalUrl) => {
  const response = await axios.post(`${API_URL}/url/shorten`, { originalUrl });
  return response.data.shortUrl;
};

export const getAnalytics = async () => {
  const response = await axios.get(`${API_URL}/url/analytics/all`);
  return response.data;
};
