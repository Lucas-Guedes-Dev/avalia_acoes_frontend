export interface ActionBase {
    ticker: string;
    company: string;
    value: number;
    ammount: number;
}

export type ActionCreate = ActionBase;

export interface ActionUpdate {
    id?: number;
    ticker?: string;
    company?: string;
    value?: number;
    ammount?: number;
}

export interface ActionResponse extends ActionBase {
    id: number;
    created_at: string; // ISO 8601 datetime
}

export interface WalletType {
    ticker: string
    empresa: string
    decisao: string
    motivo: string
    pl_real_percent: number
    valor_investido: number
    valor_atual: number
    prioridade: number
    detalhes: Detalhes
}

export interface Detalhes {
    preco_compra: number
    preco_atual_brl: number
    quantidade: number
    valor_investido: number
    valor_atual: number
    pl_real_brl: number
    pl_real_percent: number
    variacao_5d_percent: number
    rsi: any
    pl_ratio: number
    roe_percent: number
    margem_percent: number
    dividend_yield_percent: number
}
