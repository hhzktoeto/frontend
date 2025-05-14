import Header from "./Header.tsx";
import AddTransaction from "./forms/AddTransaction.tsx";
import CurrentBalance from "./cards/CurrentBalance.tsx";
import Incomes from "./cards/Incomes.tsx";
import Expenses from "./cards/Expenses.tsx";
import MonthlyOverview from "./charts/MonthlyOverview.tsx";
import CategoriesSpending from "./charts/CategoriesSpending.tsx";
import BudgetProgress from "./BudgetProgress.tsx";
import CategoryDetails from "./CategoryDetails.tsx";
import TransactionsHistory from "./forms/TransactionsHistory.tsx";
import {useState} from "react";

const mainTab: string = "Главная";
const statsTab: string = "Статистика";
const tabsNames = [mainTab, statsTab] as const;
type Tab = typeof tabsNames[number]

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState<Tab>(mainTab)

    return (
        <div id="webcrumbs">
            <div className="w-full p-6 bg-gradient-to-br from-slate-50 to-slate-100 font-sans rounded-xl shadow-lg">
                <Header/>

                <div className="flex space-x-4 mb-4">
                    {
                        tabsNames.map(tabName => (
                            <button
                                key={tabName}
                                className={`px-4 py-2 rounded-full text-sm font-medium mb-2 ${
                                    activeTab === tabName
                                        ? "bg-primary-600 text-white shadow-md"
                                        : "bg-gray-200 text-gray-600 hover:bg-gray-200"
                                }`}
                                onClick={() => setActiveTab(tabName)}>
                                {tabName}
                            </button>
                        ))
                    }
                </div>

                {activeTab === mainTab && (
                    <>
                        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                            <AddTransaction/>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            <CurrentBalance/>
                            <Incomes/>
                            <Expenses/>
                        </div>

                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <TransactionsHistory/>
                        </div>
                    </>
                )}

                {activeTab === statsTab && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <BudgetProgress/>
                            <CategoryDetails/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <MonthlyOverview/>
                            <CategoriesSpending/>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}