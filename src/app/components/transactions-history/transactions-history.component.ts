import {Component, computed, inject, signal} from '@angular/core';
import {StoreService} from "../../services/store.service";
import {SortingRules, TransactionUtils} from "../../utils/transactions.utils";
import {TransactionFieldName} from "../../constants/transaction-field-name";
import {SortingDirection} from "../../constants/sorting-direction";
import {FormattingUtils} from "../../utils/formatting.utils";
import {FormsModule} from "@angular/forms";
import {TransactionFilterService} from "../../services/transaction.filter.service";
import {Transaction} from "../../types/transaction";
import {TransactionEditModalComponent} from "../transaction-edit-modal/transaction-edit-modal.component";

@Component({
    standalone: true,
    selector: 'app-transactions-history',
    imports: [
        FormsModule,
        TransactionEditModalComponent
    ],
    templateUrl: './transactions-history.component.html'
})
export class TransactionsHistoryComponent {
    private readonly storeService = inject(StoreService);
    private readonly transactionFilterService = inject(TransactionFilterService);

    private readonly transactionsSig = this.storeService.transactionsSig;
    private readonly filterSig = this.transactionFilterService.filterSig;

    private readonly filteredTransactions = computed(() => {
        console.log("filtering transactions in \"transactions-history table\" by", this.filterSig());
        return TransactionUtils.filter(this.transactionsSig(), this.filterSig());
    })

    readonly hoveredIdSig = signal<number | null>(null);
    readonly visibleDescriptionIdSig = signal<number | null>(null);
    readonly startEditingSig = signal<Transaction | null>(null);

    readonly sortingSig = signal<SortingRules>({
        sortingBy: TransactionFieldName.DATE,
        direction: SortingDirection.DESC
    });

    readonly transactions = computed(() => {
        console.log("sorting transactions history by", this.sortingSig());
        return TransactionUtils.sort(this.filteredTransactions(), this.sortingSig())
    });

    toggleSorting(fieldName: string): void {
        const field = fieldName as TransactionFieldName;
        this.sortingSig.update(previous => {
            if (previous.sortingBy === field) {
                return {
                    sortingBy: field,
                    direction: previous.direction === SortingDirection.ASC ? SortingDirection.DESC : SortingDirection.ASC
                };
            }
            return {
                sortingBy: field,
                direction: SortingDirection.DESC
            };
        })
    }

    toggleDescription(id: number): void {
        this.visibleDescriptionIdSig.update(current => current === id ? null : id);
    }

    openEditWindow(transaction: Transaction): void {
        console.log("Open edit window:", transaction);
        this.startEditingSig.set(transaction);
    }

    cancelEdit(): void {
        this.startEditingSig.set(null);
    }

    async saveEdited(transaction: Transaction): Promise<void> {
        await this.storeService.updateTransaction(transaction);
    }

    async delete(id: number): Promise<void> {
        await this.storeService.deleteTransaction(id);
    }

    protected readonly TransactionFieldName = TransactionFieldName;
    protected readonly Object = Object;
    protected readonly FormattingUtils = FormattingUtils;
}
