import axios from "axios";

const apiUrl = (import.meta.env.VITE_API_URL?.trim() || "http://localhost:3000")
    .replace(/\/+$/, "");

export const api = axios.create({
    baseURL: apiUrl.endsWith("/v1") ? apiUrl : `${apiUrl}/v1`,
    withCredentials: true,
});
