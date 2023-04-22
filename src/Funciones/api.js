import axios from "axios";

const API_URL = "http://localhost:4000/api/newsSource/";

const api = {
  getData: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
  editData: async (item) => {
    const response = await axios.put(`${API_URL}${item._id}`, item);
    return response.data;
  },
  deleteData: async (item) => {
    const response = await axios.delete(`${API_URL}${item._id}`);
    return response.data;
  },
};

export default api;