// types/api.ts

export interface AnaliseResultado {
    ticker: string;
    empresa: string;
    setor: string;
    preco_atual: number;
    pl: number;
    roe: number;
    margem_liquida: number;
    dividend_yield: number;
    pontuacao: number;
    recomendacao: 'Comprar' | 'Comprar com cautela' | 'Manter em observação' | 'Evitar investimento';
    horizonte_investimento: string;
}

export interface AnaliseResponse {
    resultados: AnaliseResultado[];
}

export interface PrecoMaxAcao {
    ticker: string;
    empresa: string;
    preco_atual_brl: number;
    moeda_original: string;
    tipo_screener?: string;
    pais?: string;
}

export interface PrecoMaxResponse {
    acoes: PrecoMaxAcao[];
}

export interface VenderAgoraResultado {
    ticker: string;
    empresa: string;
    decisao: 'VENDER AGORA' | 'CONSIDERAR VENDA' | 'MANTER';
    motivo: string;
    preco_atual_brl: number;
    rsi: number;
    variacao_5d_percent: number;
}

export interface VenderAgoraResponse {
    resultados: VenderAgoraResultado[];
}

export interface MockApi {
    analise: (tickers: string[]) => Promise<AnaliseResponse>;
    precoMax: (maxPreco: number) => Promise<PrecoMaxResponse>;
    venderAgora: (tickers: string[]) => Promise<VenderAgoraResponse>;
}


const mockApi: MockApi = {
    analise: async (tickers: string[]): Promise<AnaliseResponse> => {
        // Simula delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const resultados = tickers.map((ticker) => ({
            ticker,
            empresa: ticker.includes('PETR')
                ? 'Petrobras'
                : ticker.includes('VALE')
                    ? 'Vale'
                    : ticker.includes('ITUB')
                        ? 'Itaú Unibanco'
                        : 'Empresa',
            setor: ticker.includes('PETR')
                ? 'Energia'
                : ticker.includes('VALE')
                    ? 'Mineração'
                    : 'Financeiro',
            preco_atual: parseFloat((Math.random() * 50 + 20).toFixed(2)),
            pl: parseFloat((Math.random() * 15 + 5).toFixed(2)),
            roe: parseFloat((Math.random() * 30 + 10).toFixed(2)),
            margem_liquida: parseFloat((Math.random() * 20 + 5).toFixed(2)),
            dividend_yield: parseFloat((Math.random() * 8 + 2).toFixed(2)),
            pontuacao: Math.floor(Math.random() * 5) + 1,
            recomendacao: ['Comprar', 'Comprar com cautela', 'Manter em observação', 'Evitar investimento'][Math.floor(Math.random() * 4)] as
                | 'Comprar'
                | 'Comprar com cautela'
                | 'Manter em observação'
                | 'Evitar investimento',
            horizonte_investimento: 'longo prazo (1 a 3 anos)',
        }));

        return { resultados };
    },

    precoMax: async (maxPreco: number): Promise<PrecoMaxResponse> => {
        await new Promise(resolve => setTimeout(resolve, 500));

        const acoes = [
            { ticker: 'PETR4.SA', empresa: 'Petrobras', preco_atual_brl: 37.8, moeda_original: 'BRL' },
            { ticker: 'VALE3.SA', empresa: 'Vale', preco_atual_brl: 62.5, moeda_original: 'BRL' },
            { ticker: 'ITUB4.SA', empresa: 'Itaú', preco_atual_brl: 32.4, moeda_original: 'BRL' },
        ].filter(a => a.preco_atual_brl <= maxPreco);

        return { acoes };
    },

    venderAgora: async (tickers: string[]): Promise<VenderAgoraResponse> => {
        await new Promise(resolve => setTimeout(resolve, 500));

        const resultados = tickers.map((ticker) => ({
            ticker,
            empresa: 'Itaú Unibanco',
            decisao: ['VENDER AGORA', 'CONSIDERAR VENDA', 'MANTER'][Math.floor(Math.random() * 3)] as
                | 'VENDER AGORA'
                | 'CONSIDERAR VENDA'
                | 'MANTER',
            motivo: 'P/L acima da média | Sem dividendos relevantes',
            preco_atual_brl: parseFloat((Math.random() * 40 + 20).toFixed(2)),
            rsi: parseFloat((Math.random() * 40 + 40).toFixed(2)),
            variacao_5d_percent: parseFloat((Math.random() * 10 - 5).toFixed(2)),
        }));

        return { resultados };
    },
};

export default mockApi;
