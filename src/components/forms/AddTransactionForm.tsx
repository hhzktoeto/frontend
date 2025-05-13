import {getCategories} from "../../services/categoryService.ts";
import type {Transaction, TransactionDTO} from "../../types/Transaction.ts";
import {add} from "../../api/api.ts";
import {ApiPath} from "../../api/ApiPath.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useEffect, useRef} from "react";

export default function AddTransactionForm() {
    const typeRef = useRef<HTMLSelectElement>(null)
    const categoryRef = useRef<HTMLInputElement>(null)
    const amountRef = useRef<HTMLInputElement>(null)
    const dateRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLInputElement>(null)

    const queryClient = useQueryClient();

    // categories - нужные мне данные, которые будут обновляться каждый раз, как будет вызван
    // queryClient.invalidateQueries, по принципу:
    // queryKey - ключ для того, чтобы определить какой компонент надо обновить. Указывается в функции invalidateQueries
    // queryFn - то, какую функцию надо вызвать для обновления. То, какие данные вернёт getCategories будет определять, что хранится в categories
    const {data: categories = []} = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    const {mutate: createTransaction} = useMutation({
        mutationFn: (dto: TransactionDTO) => add<TransactionDTO, Transaction>(ApiPath.Transactions, dto),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["categories"]});
            queryClient.invalidateQueries({queryKey: ["transactions"]});
        }
    })

    useEffect(() => {
        if (dateRef.current) {
            dateRef.current.value = new Date().toISOString().split("T")[0];
        }
    }, []);

    return (
        <div>
            <div className="p-4 border-t bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-4">
                        <h3 className="text-lg font-medium mb-4">Добавить транзакцию</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Тип</label>
                                <select ref={typeRef}
                                        className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400">
                                    <option>Расход</option>
                                    <option>Доход</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Категория</label>
                                <input
                                    list="categories"
                                    ref={categoryRef}
                                    className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"/>
                                <datalist id="categories"
                                          className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400">
                                    {
                                        categories.map(category => {
                                            return <option key={category.id} value={category.name}/>
                                        })
                                    }
                                </datalist>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Сумма</label>
                                <input ref={amountRef}
                                       type="number"
                                       className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                                       placeholder="0.00"/>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Дата</label>
                                <input ref={dateRef}
                                       type="date"
                                       className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                                       placeholder="0.00"/>
                            </div>
                            <div className="md:col-span-4">
                                <label className="block text-xs text-gray-500 mb-1">Описание</label>
                                <input ref={descriptionRef}
                                       type="text"
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
                                    const type: string = typeRef.current?.value === "Расход" ? "EXPENSE" : "INCOME";
                                    const dto: TransactionDTO = {
                                        type: type,
                                        category: String(categoryRef.current?.value),
                                        amount: Number(amountRef.current?.value),
                                        date: String(dateRef.current?.value),
                                        description: String(descriptionRef.current?.value)
                                    }
                                    createTransaction(dto);
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