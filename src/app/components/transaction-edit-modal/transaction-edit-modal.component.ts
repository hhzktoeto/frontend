import {Component, EventEmitter, HostListener, inject, Input, Output} from '@angular/core';
import {Transaction} from "../../types/transaction";
import {FormBuilder, FormsModule, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {MatFormField, MatLabel, MatOption, MatSelect} from "@angular/material/select";
import {TransactionType} from "../../constants/transaction-type";
import {MatInput} from "@angular/material/input";

@Component({
    standalone: true,
    selector: 'app-edit-transaction-modal',
    templateUrl: './transaction-edit-modal.component.html',
    imports: [
        FormsModule,
        DatePipe,
        MatFormField,
        MatLabel,
        MatSelect,
        MatOption,
        MatInput
    ]
})
export class TransactionEditModalComponent {
    @Input() transaction!: Transaction;
    @Output() save = new EventEmitter<Transaction>();
    @Output() cancel = new EventEmitter<void>();
    @Output() delete = new EventEmitter<number>();

    private readonly formBuilder = inject(FormBuilder);

    readonly form = () => this.formBuilder.group({
        type: [this.transaction.type, Validators.required],
        category: [this.transaction.category, Validators.required],
        amount: [this.transaction.amount, Validators.required],
        date: [this.transaction.date, Validators.required],
        description: this.transaction.description
    });

    onSave() {
        if (this.form().invalid) {
            console.log(this.form().getRawValue());
            console.log("Неверно введена информация для редактирования")
            return;
        }
        this.save.emit({
            ...this.transaction,
            ...this.form().getRawValue()
        } as Transaction);
    }

    onDelete() {
        this.delete.emit(this.transaction.id)
    }

    onCancel() {
        this.cancel.emit();
    }

    @HostListener('document:keydown', ['$event'])
    handleKeydown(event: KeyboardEvent) {
        if (!(event.key === 'Escape' || event.key === 'Enter')) {
            return;
        }
        if (event.key === 'Enter') {
            this.onSave();
        }
        this.onCancel();
    }

    protected readonly TransactionType = TransactionType;
}
