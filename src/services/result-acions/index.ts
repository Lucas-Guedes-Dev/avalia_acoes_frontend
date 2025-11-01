// services/result-actions.ts
import api from "../api";

class ResultActions {
    async get(
        maxPreco: number,
        pais?: string,
        tipo?: string
    ) {
        const params: any = {};
        if (pais) params.pais = pais;
        if (tipo) params.tipo = tipo;

        const response = await api.get(`/search/${maxPreco}`, { params });
        return response.data;
    }
}

export default ResultActions;