import {Component, computed, inject} from "@angular/core";
import {StoreService} from "../../services/store.service";
import {ChartData, ChartEvent, ChartOptions, LegendElement, LegendItem} from "chart.js";
import {ColorsUtils} from "../../utils/colors.utils";
import {CommonModule} from "@angular/common";
import {BaseChartDirective} from "ng2-charts";

@Component({
    standalone: true,
    selector: 'app-categories-charts',
    imports: [CommonModule, BaseChartDirective],
    templateUrl: './categories-charts.component.html'
})
export class CategoriesChartsComponent {
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

    incomesChart = computed(() => {
        const incomes = this.transactionsSig().filter(t => t.type === "INCOME");
        const categoryIncomeMap = new Map<string, number>();

        incomes.forEach(transaction => {
            const current = categoryIncomeMap.get(transaction.category) ?? 0;
            categoryIncomeMap.set(transaction.category, current + transaction.amount);
        })
        const labels = Array.from(categoryIncomeMap.keys());
        const data = Array.from(categoryIncomeMap.values());

        return {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ColorsUtils.generateColorPalette(labels.length),
                borderWidth: 0
            }]
        } as ChartData;
    });

    expensesChart = computed(() => {
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
        } as ChartData;
    });
}