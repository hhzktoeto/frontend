import type {Transaction} from "../types/transaction.ts";
import {TransactionFieldName} from "../constants/transaction-field-name";
import {ShowPeriod} from "../constants/show-period";
import {SortingDirection} from "../constants/sorting-direction";
import {TransactionType} from "../constants/transaction-type";

export interface SortingRules {
    sortingBy: TransactionFieldName
    direction: SortingDirection
}

export interface FilteringRules {
    type?: TransactionType,
    showPeriod?: ShowPeriod
}

export class TransactionUtils {

    static filter(transactions: Transaction[], rules: FilteringRules): Transaction[] {
        let result = transactions;
        if (rules.type) {
            result = this.filterByType(transactions, rules.type);
        }
        if (rules.showPeriod) {
            result = this.filterByShowPeriod(transactions, rules.showPeriod);
        }
        return result;
    }

    static sort(transactions: Transaction[], rules: SortingRules): Transaction[] {
        return [...transactions].sort((a, b) => {
            let compare = 0;

            switch (rules.sortingBy) {
                case TransactionFieldName.CATEGORY:
                    compare = a.category.localeCompare(b.category);
                    break;

                case TransactionFieldName.TYPE:
                    compare = a.type.localeCompare(b.type);
                    break;

                case TransactionFieldName.DATE:
                    compare = new Date(a.date).getTime() - new Date(b.date).getTime();
                    break;

                case TransactionFieldName.AMOUNT:
                    compare = a.amount - b.amount;
                    break;

                case TransactionFieldName.DESCRIPTION:
                    compare = a.description.localeCompare(b.description);
                    break;
            }

            if (compare === 0) {
                compare = a.id - b.id;
            }
            return rules.direction === SortingDirection.ASC ? compare : -compare;
        });
    }

    private static filterByType(transactions: Transaction[], type: TransactionType): Transaction[] {
        return transactions.filter(t => t.type === type);
    }

    private static filterByShowPeriod(transactions: Transaction[], period: ShowPeriod): Transaction[] {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        switch (period) {
            case ShowPeriod.ALL:
                return transactions;

            case ShowPeriod.CURRENT_MONTH:
                return transactions.filter(transaction => {
                    const transactionDate = new Date(transaction.date);

                    return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
                });

            case ShowPeriod.LAST_MONTH:
                return transactions.filter(transaction => {
                    const transactionDate = new Date(transaction.date);
                    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
                    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

                    return transactionDate.getMonth() === lastMonth && transactionDate.getFullYear() === lastMonthYear;
                });

            case ShowPeriod.CURRENT_YEAR:
                return transactions.filter(transaction => new Date(transaction.date).getFullYear() === currentYear);

            default:
                return transactions;
        }
    }
}