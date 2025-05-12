import React from "react";
import Chart from "react-apexcharts";
import "./src/style.css";

export const Component = () => {
    return (
        <div id="webcrumbs">
            <div className="w-[1024px] p-6 bg-gradient-to-br from-slate-50 to-slate-100 font-sans rounded-xl shadow-lg">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800">FinTrack</h1>
                    <p className="text-gray-600 mt-2">Your personal finance management tool</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div
                        className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Total Balance</h2>
                            <span className="material-symbols-outlined text-primary-500">account_balance_wallet</span>
                        </div>
                        <p className="text-3xl font-bold mb-2">$8,459.52</p>
                        <div className="flex items-center text-green-500">
                            <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                            <span className="text-sm">+2.4% from last month</span>
                        </div>
                    </div>
                    {/* Next: "Add budget progress bars" */}

                    <div
                        className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Income</h2>
                            <span className="material-symbols-outlined text-green-500">trending_up</span>
                        </div>
                        <p className="text-3xl font-bold mb-2">$4,250.00</p>
                        <div className="flex items-center text-green-500">
                            <span className="material-symbols-outlined text-sm mr-1">arrow_upward</span>
                            <span className="text-sm">+$750 from last month</span>
                        </div>
                    </div>

                    <div
                        className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Expenses</h2>
                            <span className="material-symbols-outlined text-red-500">trending_down</span>
                        </div>
                        <p className="text-3xl font-bold mb-2">$2,846.33</p>
                        <div className="flex items-center text-red-500">
                            <span className="material-symbols-outlined text-sm mr-1">arrow_downward</span>
                            <span className="text-sm">+$320 from last month</span>
                        </div>
                    </div>
                    {/* Next: "Add savings goal tracker" */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="md:col-span-2 bg-white p-5 rounded-xl shadow-md">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">Monthly Overview</h2>
                            <div className="relative">
                                <details className="group">
                                    <summary
                                        className="list-none flex items-center gap-1 cursor-pointer bg-gray-100 rounded-lg px-3 py-1 hover:bg-gray-200 transition duration-300">
                                        <span className="text-sm">Last 6 months</span>
                                        <span
                                            className="material-symbols-outlined text-sm transition-transform duration-300 group-open:rotate-180">expand_more</span>
                                    </summary>
                                    <div
                                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-10">
                                        <ul className="py-1">
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">Last 3
                                                months
                                            </li>
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">Last 6
                                                months
                                            </li>
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">Last 12
                                                months
                                            </li>
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">Custom
                                                range
                                            </li>
                                        </ul>
                                    </div>
                                </details>
                            </div>
                        </div>
                        <div className="h-[300px]">
                            <Chart
                                type="bar"
                                height={280}
                                width="100%"
                                series={[
                                    {
                                        name: 'Income',
                                        data: [3500, 3700, 3900, 3450, 4100, 4250]
                                    },
                                    {
                                        name: 'Expenses',
                                        data: [2100, 2350, 2700, 2450, 2650, 2846]
                                    }
                                ]}
                                options={{
                                    chart: {
                                        stacked: false,
                                        toolbar: {
                                            show: false
                                        },
                                        zoom: {
                                            enabled: false
                                        }
                                    },
                                    plotOptions: {
                                        bar: {
                                            horizontal: false,
                                            columnWidth: '60%',
                                            borderRadius: 6
                                        },
                                    },
                                    colors: ['primary-500', 'neutral-500'],
                                    xaxis: {
                                        categories: ['June', 'July', 'August', 'September', 'October', 'November'],
                                    },
                                    legend: {
                                        position: 'top',
                                        horizontalAlign: 'right'
                                    },
                                    dataLabels: {
                                        enabled: false
                                    },
                                    grid: {
                                        borderColor: '#f1f1f1'
                                    },
                                    tooltip: {
                                        shared: true,
                                        intersect: false
                                    }
                                }}
                            />
                        </div>
                        {/* Next: "Add income vs expense line chart" */}
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Spending Categories</h2>
                        <div className="h-[300px]">
                            <Chart
                                type="donut"
                                height={280}
                                width="100%"
                                series={[856, 670, 432, 382, 298, 208]}
                                options={{
                                    labels: ['Housing', 'Food', 'Transport', 'Entertainment', 'Utilities', 'Others'],
                                    chart: {
                                        toolbar: {
                                            show: false
                                        }
                                    },
                                    colors: ['primary-600', 'primary-400', 'neutral-500', 'neutral-400', 'primary-300', 'neutral-300'],
                                    legend: {
                                        position: 'bottom'
                                    },
                                    dataLabels: {
                                        enabled: false
                                    },
                                    plotOptions: {
                                        pie: {
                                            donut: {
                                                size: '60%'
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                        {/* Next: "Add category-wise spending details section" */}
                    </div>
                </div>


                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white p-5 rounded-xl shadow-md">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold">Budget Progress</h2>
                                <button
                                    className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg transition duration-300">November
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium">Housing</span>
                                        <span className="text-sm text-gray-600">$856 / $1000</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-primary-600 h-2.5 rounded-full"
                                             style={{width: '85.6%'}}></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium">Food</span>
                                        <span className="text-sm text-gray-600">$670 / $600</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-red-500 h-2.5 rounded-full" style={{width: '111.7%'}}></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium">Transport</span>
                                        <span className="text-sm text-gray-600">$432 / $500</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-primary-600 h-2.5 rounded-full"
                                             style={{width: '86.4%'}}></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium">Entertainment</span>
                                        <span className="text-sm text-gray-600">$382 / $400</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-primary-600 h-2.5 rounded-full"
                                             style={{width: '95.5%'}}></div>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="mt-6 text-primary-600 hover:text-primary-700 text-sm flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">edit</span>
                                Set budget goals
                            </button>
                            {/* Next: "Add monthly budget comparison" */}
                        </div>

                        <div className="bg-white p-5 rounded-xl shadow-md">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold">Category Details</h2>
                                <select
                                    className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg cursor-pointer">
                                    <option>Housing</option>
                                    <option>Food</option>
                                    <option>Transport</option>
                                    <option>Entertainment</option>
                                    <option>Utilities</option>
                                </select>
                            </div>
                            <div className="space-y-3">
                                <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div
                                            className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                                            <span
                                                className="material-symbols-outlined text-primary-600 text-sm">home</span>
                                        </div>
                                        <div>
                                            <div className="font-medium">Rent</div>
                                            <div className="text-xs text-gray-500">Nov 15, 2023</div>
                                        </div>
                                    </div>
                                    <span className="text-red-500 font-medium">$1,200.00</span>
                                </div>

                                <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div
                                            className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                                            <span
                                                className="material-symbols-outlined text-primary-600 text-sm">electric_bolt</span>
                                        </div>
                                        <div>
                                            <div className="font-medium">Electricity</div>
                                            <div className="text-xs text-gray-500">Nov 10, 2023</div>
                                        </div>
                                    </div>
                                    <span className="text-red-500 font-medium">$89.75</span>
                                </div>

                                <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div
                                            className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                                            <span
                                                className="material-symbols-outlined text-primary-600 text-sm">water_drop</span>
                                        </div>
                                        <div>
                                            <div className="font-medium">Water</div>
                                            <div className="text-xs text-gray-500">Nov 5, 2023</div>
                                        </div>
                                    </div>
                                    <span className="text-red-500 font-medium">$45.20</span>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-between">
                                <span className="font-medium">Total Spent</span>
                                <span className="font-medium">$1,334.95</span>
                            </div>
                            {/* Next: "Add category comparison analytics" */}
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-md overflow-hidden">

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
                    <div>
                        <div className="p-4 border-t bg-gray-50">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="md:col-span-3">
                                    <h3 className="text-lg font-medium mb-2">Add New Transaction</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Merchant</label>
                                            <input type="text"
                                                   className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                                                   placeholder="Merchant name"/>
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Category</label>
                                            <select
                                                className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400">
                                                <option>Food & Drink</option>
                                                <option>Shopping</option>
                                                <option>Housing</option>
                                                <option>Transportation</option>
                                                <option>Entertainment</option>
                                                <option>Income</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Amount</label>
                                            <input type="text"
                                                   className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                                                   placeholder="0.00"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-end justify-end">
                                    <button
                                        className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 text-sm">
                                        Add Transaction
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Next: "Add transaction edit functionality" */}
                    </div>
                    {/* Next: "Add transaction search functionality" */}
                </div>


                <div>
                    <div className="fixed bottom-6 right-6 z-10 flex flex-col-reverse gap-3 items-center">
                        <button
                            className="bg-primary-600 hover:bg-primary-700 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 group">
                            <span
                                className="material-symbols-outlined group-hover:rotate-45 transition-transform duration-300">add</span>
                        </button>

                        <div
                            className="bg-white rounded-xl shadow-lg p-4 transform transition-all duration-300 hidden group-hover:block">
                            <div className="flex flex-col gap-3">
                                <button
                                    className="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg text-sm flex items-center">
                                    <span className="material-symbols-outlined text-sm mr-2">add_circle</span>
                                    Add Income
                                </button>
                                <button
                                    className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg text-sm flex items-center">
                                    <span className="material-symbols-outlined text-sm mr-2">remove_circle</span>
                                    Add Expense
                                </button>
                                <button
                                    className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm flex items-center">
                                    <span className="material-symbols-outlined text-sm mr-2">flag</span>
                                    Set Goal
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Next: "Add transaction edit modal" */}
                </div>

                {/* Next: "Add transaction entry modal" */}
            </div>
        </div>
    )
}

