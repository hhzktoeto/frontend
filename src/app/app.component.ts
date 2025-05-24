import {Component, inject, OnInit} from '@angular/core';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {StoreService} from "./services/store.service";
import {ProgressSpinner} from "primeng/progressspinner";
import {CommonModule} from "@angular/common";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
    standalone: true,
    selector: 'app-root',
    imports: [CommonModule, DashboardComponent, ProgressSpinner],
    templateUrl: 'app.component.html',
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({opacity: 0}),
                animate('100ms', style({opacity: 1}))
            ])
        ])
    ]
})
export class AppComponent implements OnInit {
    private readonly store = inject(StoreService);
    loading = true;

    async ngOnInit(): Promise<void> {
        await this.store.init();
        this.loading = false;
    }
}
