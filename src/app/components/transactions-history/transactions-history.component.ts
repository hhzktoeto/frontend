import {Component, computed, inject, signal} from '@angular/core';
import {StoreService} from "../../services/store.service";
import {SortingRules, TransactionUtils} from "../../utils/transactions.utils";
import {TransactionFieldName} from "../../constants/transaction-field-name";
import {SortingDirection} from "../../constants/sorting-direction";
import {FormattingUtils} from "../../utils/formatting.utils";
import {NgIf} from "@angular/common";
import {Transaction} from "../../types/transaction";
import {FormsModule} from "@angular/forms";
import {EditRowFocusDirective} from "../../directrives/edit-row-focus.directive";
import {TransactionFilterService} from "../../services/transaction.filter.service";

@Component({
    standalone: true,
    selector: 'app-transactions-history',
    imports: [
        NgIf,
        FormsModule,
        EditRowFocusDirective
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
    readonly editingIdSig = signal<number | null>(null);
    readonly editBufferSig = signal<Partial<Transaction>>({});

    readonly sortingSig = signal<SortingRules>({
        sortingBy: TransactionFieldName.DATE,
        direction: SortingDirection.DESC
    });

    readonly transactions = computed(() => {
        console.log("sorting transactions history by", this.sortingSig());
        return TransactionUtils.sort(this.filteredTransactions(), this.sortingSig())
    })

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

    startEdit(transaction: Transaction): void {
        this.editingIdSig.set(transaction.id);
        this.editBufferSig.set({...transaction});
    }

    updateEditBuffer<K extends keyof Transaction>(field: K, value: Transaction[K]): void {
        this.editBufferSig.update(current => ({
            ...current,
            [field]: value
        }));
    }

    cancelEdit(): void {
        this.editingIdSig.set(null);
        this.editBufferSig.set({});
    }

    async saveEdit(id: number): Promise<void> {
        const updated = {
            ...this.editBufferSig(),
            id
        } as Transaction;
        await this.storeService.updateTransaction(updated);
        this.editingIdSig.set(null);
    }

    async delete(id: number): Promise<void> {
        await this.storeService.deleteTransaction(id);
    }

    protected readonly TransactionFieldName = TransactionFieldName;
    protected readonly Object = Object;
    protected readonly FormattingUtils = FormattingUtils;
}
