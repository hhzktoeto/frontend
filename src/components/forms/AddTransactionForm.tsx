import {useEffect, useState} from "react";
import type {Category} from "../../types/Category.ts";
import {addTransaction} from "../../services/transactionsService.ts";
import {getCategories} from "../../services/categoryService.ts";
import * as React from "react";

export interface TransactionForm {
    type: string;
    category: string;
    amount: number;
    date: string;
    description: string;
}

const emptyTransactionForm: TransactionForm = {
    type: "EXPENSE",
    category: "",
    amount: 0.00,
    date: new Date().toISOString().split("T")[0],
    description: ""
}

export default function AddTransactionForm() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [transactionForm, setTransactionForm] = useState<TransactionForm>(emptyTransactionForm)
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setTransactionForm(prevState => {
            let processedValue: string | number = value;

            if (name === "amount") {
                processedValue = Number(value) || 0.00;
            }
            if (name === "date") {
                processedValue = new Date(value).toISOString().split("T")[0];
            }

            return {
                ...prevState,
                [name]: processedValue
            }
        })
    }

    useEffect(() => {
        getCategories().then(setCategories)
    }, []);

    return (
        <div>
            <div className="p-4 border-t bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-4">
                        <h3 className="text-lg font-medium mb-2">Добавить транзакцию</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Тип</label>
                                <select
                                    name="type"
                                    value={transactionForm.type}
                                    onChange={handleFormChange}
                                    className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400">
                                    <option>Расход</option>
                                    <option>Доход</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Категория</label>
                                <select
                                    className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400">
                                    {
                                        categories.map(category => {
                                            return <option key={category.id}>{category.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Сумма</label>
                                <input type="number"
                                       className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                                       placeholder="0.00"/>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Дата</label>
                                <input type="date"
                                       className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                                       placeholder="0.00"/>
                            </div>
                            <div className="md:col-span-4">
                                <label className="block text-xs text-gray-500 mb-1">Описание</label>
                                <input type="text"
                                       className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <button
                        className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 text-sm z-10"
                        onClick={
                            async () => {
                                try {
                                    await addTransaction(transactionForm);
                                    setTransactionForm(emptyTransactionForm)
                                } catch (error) {
                                    console.error("Ошибка во время добавления транзакции:", error)
                                }
                            }
                        }>
                        Добавить
                    </button>
                </div>
            </div>
        </div>
    );
}