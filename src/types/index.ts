export interface Currency {
    amount: number;
    code: string;
    country: string;
    currency: string;
    rate: number;
}

export type Currencies = Map<string, Currency>