import {useTransactionsQuery} from "../../hooks/useTransactionHook";

export default function RecentTransactionsForm() {
    const {data: transactions = []} = useTransactionsQuery();

    return (
        <>
            <div>
                <div className="flex justify-between items-center p-5 border-b">
                    <h2 className="text-xl font-semibold">Последние транзакции</h2>
                    <div className="flex gap-2">
                        <div className="relative">
                            <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-lg">
                                {/*https://fonts.google.com/icons*/}
                                <span className="material-symbols-outlined text-sm text-gray-500">search</span>
                                <input className="bg-transparent border-none outline-none text-sm w-36"
                                       placeholder="Поиск..."/>
                            </div>
                        </div>
                        <button
                            className="flex items-center gap-1 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg transition duration-300">
                            <span className="material-symbols-outlined text-sm">filter_list</span>
                            Фильтр
                        </button>
                        <button
                            className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 px-3 py-1 rounded-lg transition duration-300">
                            Все
                        </button>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Тип</th>
                        <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Категория</th>
                        <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата</th>
                        <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Сумма</th>
                        <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Описание</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {
                        transactions.map(transaction => {
                            const transactionType = transaction.type;
                            return <tr className="hover:bg-blue-200 transition-colors duration-150 cursor-pointer">
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
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
                                <td className="px-6 py-2 whitespace-nowrap">{transactionType === "EXPENSE" ? "Расход" : "Доход" }</td>
                                <td className="px-6 py-4 whitespace-nowrap">{transaction.date}</td>
                                <td className={`px-6 py-4 whitespace-nowrap ${transactionType === "EXPENSE" ? "text-red-500" : "text-green-500" } font-medium`}
                                    onClick={() => console.log("clicked on amount")}>{transaction.amount}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{transaction.description}</td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>
        </>
    );
}