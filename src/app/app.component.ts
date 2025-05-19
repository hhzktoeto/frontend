import {Component, inject, OnInit} from '@angular/core';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {StoreService} from "./services/store.service";

@Component({
    standalone: true,
    selector: 'app-root',
    imports: [DashboardComponent],
    templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
    private readonly store = inject(StoreService);

    async ngOnInit(): Promise<void> {
        await this.store.init();
    }
}
