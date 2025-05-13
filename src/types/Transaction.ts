export interface Transaction {
    id: number;
    usedId: number;
    type: 'INCOME' | 'EXPENSE';
    category: string;
    date: string;
    amount: number;
    description: string;
}

export interface TransactionDTO {
    type: string;
    category: string;
    date: string;
    amount: number;
    description: string;
}