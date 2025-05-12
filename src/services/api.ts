import axios, {type AxiosResponse} from 'axios';
import type {Transaction} from "../types/Transaction.ts";
import type {Category} from "../types/Category.ts";

const api = axios.create({
    baseURL: 'http://localhost:8080'
});

export const getAllTransactions = async (): Promise<Transaction[]> => {
    const response: AxiosResponse = await api.get('/transactions')
    return response.data;
}

export const getAllCategories = async (): Promise<Category[]> => {
    const response: AxiosResponse = await api.get('/categories')
    return response.data;
}