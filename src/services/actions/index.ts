import api from "../api";
import { type ActionUpdate, type ActionResponse, type ActionCreate } from "./types";

class ActionService {
    constructor() { }
    async list(): Promise<ActionResponse[]> {
        const response = await api.get<ActionResponse[]>("/actions");
        return response.data;
    }

    async get(id: number): Promise<ActionResponse> {
        const response = await api.get<ActionResponse>(`/actions/${id}`);
        return response.data;
    }

    async create(data: ActionCreate): Promise<ActionResponse> {
        const response = await api.post<ActionResponse>("/actions", data);
        return response.data;
    }

    async update(id: number, data: ActionUpdate): Promise<ActionResponse> {
        const response = await api.put<ActionResponse>(`/actions/${id}`, data);
        return response.data;
    }

    async delete(id: number): Promise<boolean> {
        const response = await api.delete<boolean>(`/actions/${id}`);
        return response.data;
    }
}

export default ActionService;
