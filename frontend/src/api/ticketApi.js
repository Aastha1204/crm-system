import axios from "axios";

const API = axios.create({

  baseURL: "https://crm-backend-rvng.onrender.com/api",

});

export default API;