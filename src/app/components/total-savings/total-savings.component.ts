import {Component, computed, inject} from '@angular/core';
import {StoreService} from "../../services/store.service";
import {CommonModule} from "@angular/common";
import {TransactionUtils} from "../../utils/transactions.utils";

@Component({
    standalone: true,
    selector: 'app-current-balance',
    imports: [CommonModule],
    templateUrl: './total-savings.component.html'
})
export class TotalSavingsComponent {
    private readonly storeService = inject(StoreService);

    readonly totalAmount = computed(() => {
        const transactions = this.storeService.transactionsSig();
        const filtered = TransactionUtils.filter(transactions, this.storeService.showPeriodSig());
        return filtered.reduce((sum, transaction) => {
                return transaction.type === "INCOME"
                    ? sum + transaction.amount
                    : sum - transaction.amount;
            }, 0);
    })
}
