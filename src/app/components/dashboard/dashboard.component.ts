import {Component, inject} from '@angular/core';
import {TabName} from '../../constants/tab-name';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from '../header/header.component';
import {ShowPeriod} from '../../constants/show-period';
import {AddTransactionComponent} from '../add-transaction/add-transaction.component';
import {CurrentBalanceComponent} from "../current-balance/current-balance.component";
import {TotalExpensesComponent} from "../total-expenses/total-expenses.component";
import {TotalIncomesComponent} from "../total-incomes/total-incomes.component";
import {TransactionsHistoryComponent} from "../transactions-history/transactions-history.component";
import {StoreService} from "../../services/store.service";

@Component({
    standalone: true,
    selector: 'app-dashboard',
    imports: [CommonModule, HeaderComponent, AddTransactionComponent, CurrentBalanceComponent, TotalExpensesComponent, TotalIncomesComponent, TransactionsHistoryComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    private readonly storeService = inject(StoreService);

    activeTab = TabName.MAIN;

    setTab(tab: string): void {
        this.activeTab = tab as TabName;
    }

    changeShowPeriod(period: string): void {
        this.storeService.updateShowPeriod(period as ShowPeriod);
    }

    protected readonly TabName = TabName;
    protected readonly ShowPeriod = ShowPeriod;
    protected readonly Object = Object;
}
