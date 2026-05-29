import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://crm-backend-rvng.onrender.com/api",
});

export default API;