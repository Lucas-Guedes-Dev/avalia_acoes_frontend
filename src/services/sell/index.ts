// services/result-actions.ts
import api from "../api";

class SellNowService {
    async post(tickers: string[]) {
        const response = await api.post(`/sell/now`, {
            tickers: tickers
        });
        return response.data;
    }
}

export default SellNowService;