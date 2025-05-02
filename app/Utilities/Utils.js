import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_APP_URL

export const handlePostAPI = async (url, data, headers = {}) => {
    try {
      const res = await axios.post(`${API_URL}${url}`, data, { headers });
      return res;
    } catch (error) {
      return {
        data: {
          status: false,
          message: error?.response?.data?.message || "Something went wrong",
        },
      };
    }
};
export const handleGetAPI = async (url, headers = {}) => {
  try {
    const res = await axios.get(`${API_URL}${url}`, headers);
    return res;
  } catch (e) {
    return {
      data: {
        status: false,
        message: e?.response?.data?.message || 'Server error'
      }
    }
    }
  }