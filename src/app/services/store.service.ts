import {computed, inject, Injectable, signal} from '@angular/core';
import {Transaction, TransactionDTO} from '../types/transaction';
import {Category} from '../types/category';
import {CategoryService} from './category.service';
import {TransactionService} from './transaction.service';
import {ShowPeriod} from "../constants/show-period";
import {TransactionUtils} from "../utils/transactions.utils";

@Injectable({providedIn: "root"})
export class StoreService {
    private readonly categoryService = inject(CategoryService);
    private readonly transactionService = inject(TransactionService);

    private readonly _transactions = signal<Transaction[]>([]);
    private readonly _categories = signal<Category[]>([]);
    private readonly _showPeriodFilter = signal<ShowPeriod>(ShowPeriod.CURRENT_MONTH);

    readonly transactionsSig = computed(() => TransactionUtils.filter(
        this._transactions(),
        {
            showPeriod: this._showPeriodFilter()
        }
    ));
    readonly categoriesSig = this._categories.asReadonly();

    async init(): Promise<void> {
        await Promise.all([
            this.loadTransactions(),
            this.loadCategories()
        ]);
    }

    async addTransaction(dto: TransactionDTO): Promise<void> {
        try {
            const newTransaction = await this.transactionService.create(dto);
            this._transactions.update(current => [...current, newTransaction]);
            await this.loadCategories();
        } catch (err) {
            console.error("Failed to add transaction", err);
        }
    }

    async updateTransaction(transaction: Transaction): Promise<void> {
        try {
            const updatedTransaction = await this.transactionService.update(transaction);
            this._transactions.update(current => current.map(oldTransaction =>
                oldTransaction.id === updatedTransaction.id ? updatedTransaction : oldTransaction
            ));
            await this.loadCategories();
        } catch (err) {
            console.error("Failed to update transaction", err);
        }
    }

    async deleteTransaction(id: number): Promise<void> {
        try {
            await this.transactionService.delete(id);
            this._transactions.update(current =>
                current.filter(transaction => transaction.id !== id)
            );
            await this.loadCategories();
        } catch (err) {
            console.error("Failed to delete transaction", err);
        }
    }

    setShowPeriodFilter(period: ShowPeriod): void {
        this._showPeriodFilter.set(period);
    }

    private async loadTransactions(): Promise<void> {
        try {
            const transactions = await this.transactionService.getAll();
            this._transactions.set(transactions);
        } catch (err) {
            console.error("Failed to refresh transactions", err);
        }
    }

    private async loadCategories(): Promise<void> {
        try {
            const categories = await this.categoryService.getAll();
            this._categories.set(categories);
        } catch (err) {
            console.error("Failed to refresh transactions", err);
        }
    }
}
