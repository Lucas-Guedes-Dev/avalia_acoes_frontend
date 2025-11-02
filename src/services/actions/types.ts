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
