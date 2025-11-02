// types/api.ts

export interface AnaliseResultado {
    ticker: string;
    empresa: string;
    setor: string;
    preco_atual: CurrentPrice;
    pl: number;
    roe: number;
    margem_liquida: number;
    dividend_yield: number;
    pontuacao: number;
    recomendacao: 'Comprar' | 'Comprar com cautela' | 'Manter em observação' | 'Evitar investimento';
    horizonte_investimento: string;
}

export interface CurrentPrice {
    preco_brl: number
    cotacao_usd: number
    moeda_original: string
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
