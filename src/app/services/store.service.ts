import {inject, Injectable, signal} from '@angular/core';
import {Transaction, TransactionDTO} from '../types/transaction';
import {Category} from '../types/category';
import {CategoryService} from './category.service';
import {TransactionService} from './transaction.service';
import {ShowPeriod} from "../constants/show-period";

@Injectable({providedIn: "root"})
export class StoreService {
    private readonly categoryService = inject(CategoryService);
    private readonly transactionService = inject(TransactionService);

    // Сигналы, которые внутри себя хранят данные. Для изменения данных, надо обращаться к сигналам. Они после изменения уведомят всех подпичсиков
    private readonly _transactions = signal<Transaction[]>([]);
    private readonly _categories = signal<Category[]>([]);
    private readonly _showPeriod = signal<ShowPeriod>(ShowPeriod.CURRENT_MONTH);

    // Для доступа к данным с динамическим обновлением надо вызывать storeService.transactionsSig() <- скобочки важны
    public readonly transactionsSig = this._transactions.asReadonly();
    public readonly categoriesSig = this._categories.asReadonly();
    public readonly showPeriodSig = this._showPeriod.asReadonly();

    private readonly categoriesNames = new Set<string>();

    constructor() {
        this.loadTransactions();
        this.loadCategories();
    }

    async loadTransactions(): Promise<void> {
        try {
            const transactions = await this.transactionService.getAll();
            this._transactions.set(transactions);
        } catch (err) {
            console.error("Failed to refresh transactions", err);
        }
    }

    async loadCategories(): Promise<void> {
        try {
            const categories = await this.categoryService.getAll();
            this._categories.set(categories);
            this.updateCategoriesNames(categories);
        } catch (err) {
            console.error("Failed to refresh transactions", err);
        }
    }

    async addTransaction(dto: TransactionDTO): Promise<void> {
        try {
            const newTransaction = await this.transactionService.create(dto);
            this._transactions.update(current => [...current, newTransaction]);
        } catch (err) {
            console.error("Failed to add transaction", err);
        }
    }

    async deleteTransaction(id: number): Promise<void> {
        try {
            await this.transactionService.delete(id);
            this._transactions.update(current =>
                current.filter(transaction => transaction.id !== id)
            );
        } catch (err) {
            console.error("Failed to delete transaction", err);
        }
    }

    updateShowPeriod(period: ShowPeriod): void {
        this._showPeriod.set(period);
    }

    private updateCategoriesNames(categories: Category[]): void {
        this.categoriesNames.clear();
        categories.forEach(category => this.categoriesNames.add(category.name));
    }
}
