import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// later: interceptors for auth / logging / errors
// api.interceptors.request.use(...)

export default api;
