import {Component, computed, inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import {StoreService} from "../../services/store.service";
import {TransactionUtils} from "../../utils/transactions.utils";

@Component({
  standalone: true,
  selector: 'app-total-incomes',
  imports: [CommonModule],
  templateUrl: './total-incomes.component.html'
})
export class TotalIncomesComponent {
  private readonly storeService = inject(StoreService);

  readonly totalAmount = computed(() => {
    const transactions = this.storeService.transactionsSig();
    const filtered = TransactionUtils.filter(transactions, this.storeService.showPeriodSig());
    return filtered.filter(transaction => transaction.type === "INCOME")
        .reduce((sum, transaction) => {
          return sum + transaction.amount;
        }, 0);
  })
}
