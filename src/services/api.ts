import axios from 'axios';
import type {Transaction} from "../types/Transaction.ts";

const api = axios.create({
    baseURL: 'http://localhost:8080'
});

export const getAllTransactions = async (): Promise<Transaction[]> => {
    const response = await api.get('/transactions')
    return response.data;
}