import {Component, computed, inject} from '@angular/core';
import {StoreService} from "../../services/store.service";
import {CommonModule} from "@angular/common";
import {TransactionUtils} from "../../utils/transactions.utils";

@Component({
    standalone: true,
    selector: 'app-total-expenses',
    imports: [CommonModule],
    templateUrl: './total-expenses.component.html',
    styleUrl: './total-expenses.component.scss'
})
export class TotalExpensesComponent {
    private readonly storeService = inject(StoreService);

    readonly totalAmount = computed(() => {
        const transactions = this.storeService.transactionsSig();
        const filtered = TransactionUtils.filter(transactions, this.storeService.showPeriodSig());
        return filtered.filter(transaction => transaction.type === "EXPENSE")
            .reduce((sum, transaction) => {
                return sum + transaction.amount;
            }, 0);
    })
}
