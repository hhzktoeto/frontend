import {Component, computed, inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import {StoreService} from "../../services/store.service";
import {BaseChartDirective} from "ng2-charts";
import {ChartData, ChartEvent, ChartOptions, LegendElement, LegendItem} from "chart.js";
import {ColorsUtils} from "../../utils/colors.utils";

@Component({
    standalone: true,
    selector: 'app-categories-spending-chart',
    imports: [CommonModule, BaseChartDirective],
    templateUrl: './categories-spending-chart.component.html'
})
export class CategoriesSpendingChartComponent {
    private readonly storeService = inject(StoreService);
    private readonly transactionsSig = this.storeService.transactionsSig;

    chartOptions: ChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                usePointStyle: true,
                backgroundColor: '#3b4252',
                titleColor: '#eceff4',
                bodyColor: '#d8dee9',
                borderColor: '#4c566a',
                borderWidth: 1,
                callbacks: {
                    labelPointStyle: () => ({
                        pointStyle: 'rectRounded',
                        rotation: 0,
                    })
                }
            },
            legend: {
                position: 'left',
                labels: {
                    color: '#d8dee9',
                    boxHeight: 15,
                    boxWidth: 20
                },
                onHover(e: ChartEvent, legendItem: LegendItem, legend: LegendElement<any>) {
                    legend.chart.setActiveElements([{datasetIndex: 0, index: legendItem.index!}])
                    legend.chart.update()
                },
                onLeave: (e, legendItem, legend) => {
                    legend.chart.setActiveElements([]);
                    legend.chart.update();
                }
            }
        }
    }

    chartData = computed(() => {
        const expenses = this.transactionsSig().filter(t => t.type === "EXPENSE");
        const categorySpendingMap = new Map<string, number>();

        expenses.forEach(transaction => {
            const current = categorySpendingMap.get(transaction.category) ?? 0;
            categorySpendingMap.set(transaction.category, current + transaction.amount);
        })
        const labels = Array.from(categorySpendingMap.keys());
        const data = Array.from(categorySpendingMap.values());

        return {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ColorsUtils.generateColorPalette(labels.length),
                borderWidth: 0
            }]
        } as ChartData
    })
}

