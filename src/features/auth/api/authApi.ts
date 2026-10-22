import { api } from "../../../service/api";
import type { LoginCredentials, RegisterCredentials, SessionResponse } from "../types";

export const authApi = {
    async login(credentials:LoginCredentials) {
        const response = await api.post<SessionResponse>("/auth/login", credentials);
        if (!response.data.success || !response.data.data?.email) throw new Error("Invalid session response");
        return response.data;
    },
    async register(credentials:RegisterCredentials) {
        const response = await api.post<SessionResponse>("/auth/register", credentials);
        if (!response.data.success || !response.data.data?.email) throw new Error("Invalid registration response");
        return response.data;
    },
    async me() {
        const response = await api.get<SessionResponse>("/auth/me");
        if (!response.data.success || !response.data.data?.email) throw new Error("Invalid session response");
        return response.data;
    },
    async logout() {return (await api.post("/auth/logout")).data;},
};
