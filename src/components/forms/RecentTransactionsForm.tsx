export default function RecentTransactionsForm() {
    return (
        <>
            <div>
                <div className="flex justify-between items-center p-5 border-b">
                    <h2 className="text-xl font-semibold">Recent Transactions</h2>
                    <div className="flex gap-2">
                        <div className="relative">
                            <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-lg">
                                <span className="material-symbols-outlined text-sm text-gray-500">search</span>
                                <input className="bg-transparent border-none outline-none text-sm w-36"
                                       placeholder="Search transactions..."/>
                            </div>
                        </div>
                        <button
                            className="flex items-center gap-1 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg transition duration-300">
                            <span className="material-symbols-outlined text-sm">filter_list</span>
                            Filter
                        </button>
                        <button
                            className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 px-3 py-1 rounded-lg transition duration-300">
                            View All
                        </button>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Merchant</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div
                                    className="h-10 w-10 flex-shrink-0 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                                        <span
                                            className="material-symbols-outlined text-primary-600">shopping_bag</span>
                                </div>
                                <div>
                                    <div className="font-medium">Amazon</div>
                                    <div className="text-sm text-gray-500">Online Shopping</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">Shopping</td>
                        <td className="px-6 py-4 whitespace-nowrap">Nov 24, 2023</td>
                        <td className="px-6 py-4 whitespace-nowrap text-red-500 font-medium">-$89.99</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                    className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span>
                        </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div
                                    className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                    <span className="material-symbols-outlined text-blue-600">restaurant</span>
                                </div>
                                <div>
                                    <div className="font-medium">Starbucks</div>
                                    <div className="text-sm text-gray-500">Coffee Shop</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">Food & Drink</td>
                        <td className="px-6 py-4 whitespace-nowrap">Nov 23, 2023</td>
                        <td className="px-6 py-4 whitespace-nowrap text-red-500 font-medium">-$5.75</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                    className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span>
                        </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div
                                    className="h-10 w-10 flex-shrink-0 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                        <span
                                            className="material-symbols-outlined text-green-600">account_balance</span>
                                </div>
                                <div>
                                    <div className="font-medium">ABC Company</div>
                                    <div className="text-sm text-gray-500">Salary</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">Income</td>
                        <td className="px-6 py-4 whitespace-nowrap">Nov 20, 2023</td>
                        <td className="px-6 py-4 whitespace-nowrap text-green-500 font-medium">+$2,750.00</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                    className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span>
                        </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div
                                    className="h-10 w-10 flex-shrink-0 bg-red-100 rounded-full flex items-center justify-center mr-3">
                                    <span className="material-symbols-outlined text-red-600">home</span>
                                </div>
                                <div>
                                    <div className="font-medium">City Apartments</div>
                                    <div className="text-sm text-gray-500">Rent</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">Housing</td>
                        <td className="px-6 py-4 whitespace-nowrap">Nov 15, 2023</td>
                        <td className="px-6 py-4 whitespace-nowrap text-red-500 font-medium">-$1,200.00</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                    className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span>
                        </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div
                                    className="h-10 w-10 flex-shrink-0 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                                        <span
                                            className="material-symbols-outlined text-purple-600">shopping_cart</span>
                                </div>
                                <div>
                                    <div className="font-medium">Grocery Store</div>
                                    <div className="text-sm text-gray-500">Groceries</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">Food</td>
                        <td className="px-6 py-4 whitespace-nowrap">Nov 12, 2023</td>
                        <td className="px-6 py-4 whitespace-nowrap text-red-500 font-medium">-$85.47</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                    className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}