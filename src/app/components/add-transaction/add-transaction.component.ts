import {Component, inject, signal} from '@angular/core';
import {TransactionDTO} from '../../types/transaction';
import {CommonModule} from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {TransactionType} from '../../constants/transaction-type';
import {StoreService} from "../../services/store.service";
import {MatFormField, MatLabel, MatOption, MatSelect, MatSuffix} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {MatDatepickerInput, MatDatepickerModule, MatDatepickerToggle} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";

@Component({
    standalone: true,
    selector: 'app-add-transaction',
    providers: [provideNativeDateAdapter()],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatSelect,
        MatOption,
        MatFormField,
        MatLabel,
        MatInput,
        MatSuffix,
        MatDatepickerModule,
        MatDatepickerToggle,
        MatDatepickerInput
    ],
    templateUrl: './add-transaction.component.html'
})

export class AddTransactionComponent {
    private readonly storeService = inject(StoreService);
    private readonly formBuilder = inject(FormBuilder);

    readonly form = this.formBuilder.group({
        type: this.formBuilder.nonNullable.control(TransactionType.EXPENSE, Validators.required),
        category: ["", Validators.required],
        amount: [null, Validators.required],
        date: [new Date().toISOString().split("T")[0], Validators.required],
        description: [""]
    });

    categoriesSig = this.storeService.categoriesSig
    errorMessage = signal<string | null>(null);
    isLoading = signal(false);

    async addTransaction() {
        this.errorMessage.set(null);
        if (this.form.invalid) {
            this.errorMessage.set("Не заполнены все обязательные поля");
            return;
        }

        this.isLoading.set(true);
        try {
            const formValues = this.form.value;

            const dto: TransactionDTO = {
                type: formValues.type!,
                category: formValues.category!,
                amount: formValues.amount!,
                date: formValues.date!,
                description: formValues.description ?? "",
            };
            await this.storeService.addTransaction(dto);
            this.form.patchValue({amount: null, description: ""})
        } catch (err) {
            this.errorMessage.set("Ошибка при добавлении транзакции");
            console.error(err);
        } finally {
            this.isLoading.set(false);
        }
    }

    protected readonly TransactionType = TransactionType;
    protected readonly Object = Object;
}
