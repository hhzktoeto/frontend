import {inject, Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Transaction, TransactionDTO} from '../types/transaction';
import {ApiV1Path} from '../constants/api-v1-path';

@Injectable({providedIn: "root"})
export class TransactionService {
    private readonly apiService = inject(ApiService);

    async getAll(): Promise<Transaction[]> {
        return this.apiService.getAll<Transaction>(ApiV1Path.TRANSACTIONS);
    }

    async create(dto: TransactionDTO): Promise<Transaction> {
        return this.apiService.add<TransactionDTO, Transaction>(ApiV1Path.TRANSACTIONS, dto);
    }

    async update(transaction: Transaction): Promise<Transaction> {
        return this.apiService.update<Transaction>(ApiV1Path.TRANSACTIONS, transaction);
    }

    async delete(id: number): Promise<void> {
        return this.apiService.delete(ApiV1Path.TRANSACTIONS, id);
    }
}
