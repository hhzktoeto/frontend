import {Component, computed, inject} from '@angular/core';
import {DecimalPipe} from "@angular/common";
import {StoreService} from "../../services/store.service";
import {TransactionFilterService} from "../../services/transaction.filter.service";
import {TransactionType} from "../../constants/transaction-type";

@Component({
    standalone: true,
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

    private activeFilter: TransactionType | null = null;

    applyFilter(filter: TransactionType) {
        if (this.activeFilter === filter) {
            this.resetFilter();
            return;
        }
        this.transactionFilterService.setFilter({ type: filter });
        this.activeFilter = filter;
    }

    resetFilter() {
        if (this.activeFilter) {
            this.transactionFilterService.reset();
            this.activeFilter = null;
        }
    }

    protected readonly TransactionType = TransactionType;
}
