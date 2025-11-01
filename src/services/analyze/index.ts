import api from "../api";


class Analyze {
    async post(tickers: string[]) {
        const response = await api.post(`/analyze`, {
            tickers: tickers
        });
        return response.data;
    }
}

export default Analyze;