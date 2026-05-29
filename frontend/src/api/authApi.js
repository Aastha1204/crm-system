import axios from "axios";

const AUTH_API = axios.create({

  baseURL: "https://crm-backend-rvng.onrender.com/api/auth",

});

export default AUTH_API;