import {Component, EventEmitter, HostListener, inject, Input, Output} from '@angular/core';
import {Transaction} from "../../types/transaction";
import {FormBuilder, FormsModule, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-edit-transaction-modal',
    templateUrl: './transaction-edit-modal.component.html',
    imports: [
        FormsModule,
        DatePipe
    ],
    styleUrls: ['./transaction-edit-modal.component.css']
})
export class TransactionEditModalComponent {
    @Input() transaction!: Transaction;
    @Output() save = new EventEmitter<Transaction>();
    @Output() cancel = new EventEmitter<void>();

    private readonly formBuilder = inject(FormBuilder);
    private readonly form = () => this.formBuilder.group({
        type: [this.transaction.type, Validators.required],
        category: [this.transaction.category, Validators.required],
        amount: [this.transaction.amount, Validators.required],
        date: [this.transaction.date, Validators.required],
        description: this.transaction.description
    });


    onSave() {
        if (this.form().invalid) {
            console.log("Неверно введена информация для редактирования")
            return;
        }
        this.save.emit({
            ...this.transaction,
            type: this.form().value.type!,
            category: this.form().value.category!,
            amount: this.form().value.amount!,
            date: this.form().value.date!,
            description: this.form().value.description!
        } as Transaction);
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
}
