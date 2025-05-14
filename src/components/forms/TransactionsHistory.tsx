import {useTransactionsQuery} from "../../hooks/useTransactionHook";
import {useMemo, useState} from "react";
import type {Transaction} from "../../types/Transaction";

const TableHeader = {
    Category: "Категория",
    Type: "Тип",
    Date: "Дата",
    Amount: "Сумма",
    Description: "Описание"
} as const;

const ShowPeriod = {
    CurrentMonth: "Текущий месяц",
    LastMonth: "Прошлый месяц",
    CurrentYear: "Текущий год",
    All: "Все",
    Custom: "Выбрать период"
} as const;

interface SortingBy {
    header: TableHeader,
    direction: "ASC" | "DESC"
}

type ShowPeriod = typeof ShowPeriod[keyof typeof ShowPeriod];
type TableHeader = typeof TableHeader[keyof typeof TableHeader];

function filterByShowPeriod(transactions: Array<Transaction>, showPeriod: ShowPeriod): Array<Transaction> {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    switch (showPeriod) {
        case ShowPeriod.All:
            return transactions;
        case ShowPeriod.CurrentMonth:
            return transactions.filter(transaction => {
                const transactionDate = new Date(transaction.date);

                return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
            });
        case ShowPeriod.LastMonth:
            return transactions.filter(transaction => {
                const transactionDate = new Date(transaction.date);
                const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
                const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

                return transactionDate.getMonth() === lastMonth && transactionDate.getFullYear() === lastMonthYear;
            });
        case ShowPeriod.CurrentYear:
            return transactions.filter(transaction => new Date(transaction.date).getFullYear() === currentYear);
        case ShowPeriod.Custom:
            // TODO: Добавить выбор кастомного периода
            return transactions;
        default:
            return transactions;
    }
}

function sortTransactions(transactions: Array<Transaction>, sortingBy: SortingBy): Array<Transaction> {
    return [...transactions].sort((a, b) => {
        let compare = 0;

        switch (sortingBy.header) {
            case TableHeader.Category:
                compare = a.category.localeCompare(b.category);
                break;
            case TableHeader.Date:
                compare = new Date(a.date).getTime() - new Date(b.date).getTime();
                break;
            case TableHeader.Type:
                compare = a.type.localeCompare(b.type);
                break;
            case TableHeader.Description:
                compare = a.description.localeCompare(b.description);
                break;
            case TableHeader.Amount:
                compare = a.amount - b.amount;
                break;
        }
        const realCompare = compare === 0 ? a.id - b.id : compare;
        return sortingBy.direction === "ASC" ? realCompare : -realCompare;
    });
}

export default function TransactionsHistory() {
    const [showPeriod, setShowPeriod] = useState<ShowPeriod>(ShowPeriod.CurrentMonth);
    const [sorting, setSorting] = useState<SortingBy>({
        header: TableHeader.Date,
        direction: "DESC"
    });
    const {data: transactions = []} = useTransactionsQuery();

    const processedTransactions: Array<Transaction> = useMemo(() => {
        const visible = filterByShowPeriod(transactions, showPeriod);
        return sortTransactions(visible, sorting);
    }, [transactions, showPeriod, sorting]);

    function handleHeaderClick(newHeader: TableHeader) {
        setSorting((prevState) => {
            if (prevState.header === newHeader) {
                return {
                    header: newHeader,
                    direction: prevState.direction === "ASC" ? "DESC" : "ASC"
                }
            }
            return {
                header: newHeader,
                direction: "DESC"
            };
        });
    }

    return (
        <>
            <div>
                <div className="flex justify-between items-center p-5 border-b">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-semibold">История транзакций</h2>
                        <div>
                            <select
                                value={showPeriod}
                                onChange={(event) => setShowPeriod(event.target.value as ShowPeriod)}
                                className="w-full py-1 border rounded-lg text-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400">
                                {
                                    Object.values(ShowPeriod).map(option =>
                                        <option>{option}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            className="flex items-center gap-1 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg transition duration-300">
                            <span className="material-symbols-outlined text-sm">filter_alt</span>
                            Фильтр
                        </button>
                        <div className="relative">
                            <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-lg">
                                {/*https://fonts.google.com/icons*/}
                                <span className="material-symbols-outlined text-sm text-gray-500">search</span>
                                <input className="bg-transparent border-none outline-none text-sm w-36"
                                       placeholder="Поиск..."/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        {
                            Object.values(TableHeader).map(header => {
                                const isActive = sorting.header === header;
                                const isDirectionAsc = sorting.direction === "ASC";

                                return (
                                    <th
                                        key={header}
                                        onClick={() => handleHeaderClick(header)}
                                        className="px-6 py-1 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    >
                                        <span className="fles items-center gap-1">
                                            {header}
                                            {isActive && (
                                                <span className="material-symbols-outlined text-xs resize-triggers">
                                                    {isDirectionAsc ? "arrow_drop_up" : "arrow_drop_down"}
                                                </span>
                                            )}
                                        </span>
                                    </th>
                                )
                            })
                        }
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {
                        processedTransactions
                            .map(transaction => {
                                const transactionType = transaction.type;
                                return (
                                    <tr key={transaction.id}
                                        className="group hover:bg-gray-100 transition-colors duration-150">
                                        <td className="px-4 py-4 whitespace-nowrap cursor-pointer">
                                            <div className="w-24 flex items-center">
                                                <div
                                                    className="h-10 w-10 flex-shrink-0 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                                            <span
                                                className="material-symbols-outlined text-primary-600">shopping_bag</span>
                                                </div>
                                                <div>
                                                    <div className="font-medium">{transaction.category}</div>
                                                    <div className="text-sm text-gray-500">Online</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-2 whitespace-nowrap">{transactionType === "EXPENSE" ? "Расход" : "Доход"}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {new Date(transaction.date).toLocaleDateString("ru-RU", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric"
                                            }).replace(" г.", "")}
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap ${transactionType === "EXPENSE" ? "text-red-500" : "text-green-500"} font-medium`}
                                            onDoubleClick={() => console.log("clicked on amount")}>{transaction.amount.toFixed(2)}₽
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap flex justify-between">
                                            <span
                                                onDoubleClick={() => console.log("clicked on description")}
                                                className="flex text-gray-500">
                                                {transaction.description}
                                            </span>
                                            <button
                                                className="opacity-0 text-red group-hover:opacity-90 transition-opacity duration-200 ml-2">
                                                <span className="material-symbols-outlined text-base">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                    }
                    </tbody>
                </table>
            </div>
        </>
    );
}