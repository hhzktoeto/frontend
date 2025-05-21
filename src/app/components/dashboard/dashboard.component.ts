import {Component, inject} from '@angular/core';
import {TabName} from '../../constants/tab-name';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from '../header/header.component';
import {ShowPeriod} from '../../constants/show-period';
import {AddTransactionComponent} from '../add-transaction/add-transaction.component';
import {TransactionsHistoryComponent} from "../transactions-history/transactions-history.component";
import {StoreService} from "../../services/store.service";
import {CategoriesChartsComponent} from "../categories-charts/categories-charts.component";
import {SummaryCardsComponent} from "../summary-cards/summary-cards.component";

@Component({
    standalone: true,
    selector: 'app-dashboard',
    imports: [
        CommonModule,
        HeaderComponent,
        AddTransactionComponent,
        TransactionsHistoryComponent,
        CategoriesChartsComponent,
        SummaryCardsComponent
    ],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    private readonly storeService = inject(StoreService);

    activeTab = TabName.MAIN;

    setTab(tab: string): void {
        this.activeTab = tab as TabName;
    }

    setShowPeriod(period: string): void {
        this.storeService.setShowPeriodFilter(period as ShowPeriod);
    }

    protected readonly TabName = TabName;
    protected readonly ShowPeriod = ShowPeriod;
    protected readonly Object = Object;
}
