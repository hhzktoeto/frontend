import {Component, computed, inject} from '@angular/core';
import {DecimalPipe} from "@angular/common";
import {StoreService} from "../../services/store.service";
import {TransactionFilterService} from "../../services/transaction.filter.service";
import {FilteringRules} from "../../utils/transactions.utils";
import {TransactionType} from "../../constants/transaction-type";

@Component({
    selector: 'app-summary-card',
    imports: [
        DecimalPipe
    ],
    templateUrl: './summary-cards.component.html'
})
export class SummaryCardsComponent {
    private readonly store = inject(StoreService);
    private readonly transactionFilterService = inject(TransactionFilterService);

    private readonly transactionsSig = this.store.transactionsSig;

    readonly incomes = computed(() =>
        this.transactionsSig().filter(t => t.type === "INCOME")
            .reduce((sum, t) => sum + t.amount, 0)
    );

    readonly expenses = computed(() =>
        this.transactionsSig().filter(t => t.type === "EXPENSE")
            .reduce((sum, t) => sum + t.amount, 0)
    );

    readonly balance = computed(() => this.incomes() - this.expenses());

    setTransactionFilter (filter: Partial<FilteringRules>) {
        this.transactionFilterService.setFilter(filter);
    }

    resetTransactionFilter() {
        this.transactionFilterService.reset()
    }

    protected readonly TransactionType = TransactionType;
}
