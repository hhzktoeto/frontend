import {Component, HostListener, inject} from '@angular/core';
import {TabName} from '../../constants/tab-name';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from '../header/header.component';
import {ShowPeriod} from '../../constants/show-period';
import {AddTransactionComponent} from '../add-transaction/add-transaction.component';
import {TransactionsHistoryComponent} from "../transactions-history/transactions-history.component";
import {StoreService} from "../../services/store.service";
import {CategoriesChartsComponent} from "../categories-charts/categories-charts.component";
import {SummaryCardsComponent} from "../summary-cards/summary-cards.component";
import {DashboardTab} from "../../types/dashboard-tab";
import {Select} from "primeng/select";
import {FormsModule} from "@angular/forms";
import {Button} from "primeng/button";

@Component({
    standalone: true,
    selector: 'app-dashboard',
    imports: [
        CommonModule,
        HeaderComponent,
        AddTransactionComponent,
        TransactionsHistoryComponent,
        CategoriesChartsComponent,
        SummaryCardsComponent,
        Select,
        FormsModule,
        Button
    ],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    private readonly storeService = inject(StoreService);

    tabs: DashboardTab[] = [
        {name: TabName.MAIN, icon: "pi pi-home"},
        {name: TabName.STATS, icon: "pi pi-chart-bar"}
    ]
    activeTab = this.tabs[0];
    showLabels = window.innerWidth >= 640;

    setShowPeriod(period: string): void {
        this.storeService.setShowPeriodFilter(period as ShowPeriod);
    }

    @HostListener('window:resize')
    onResize() {
        this.showLabels = window.innerWidth >= 640;
    }

    protected readonly TabName = TabName;
    protected readonly Object = Object;
    protected readonly ShowPeriod = ShowPeriod;
    protected readonly window = window;
}
