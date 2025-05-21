import {Injectable, signal} from "@angular/core";
import {FilteringRules} from "../utils/transactions.utils";

@Injectable({ providedIn: 'root' })
export class TransactionFilterService {
    private readonly _filter = signal<FilteringRules>({});
    readonly filterSig = this._filter.asReadonly();

    setFilter(f: Partial<FilteringRules>) {
        this._filter.update(current => ({ ...current, ...f }));
    }

    reset() {
        this._filter.set({});
    }
}
