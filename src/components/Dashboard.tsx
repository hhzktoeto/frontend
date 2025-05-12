import Header from "./Header.tsx";
import AddTransactionForm from "./forms/AddTransactionForm.tsx";
import BalanceCard from "./cards/BalanceCard.tsx";
import IncomeCard from "./cards/IncomeCard.tsx";
import ExpensesCard from "./cards/ExpensesCard.tsx";
import MonthlyOverviewChart from "./charts/MonthlyOverviewChart.tsx";
import CategoriesChart from "./charts/CategoriesChart.tsx";
import BudgetProgress from "./BudgetProgress.tsx";
import CategoryDetails from "./CategoryDetails.tsx";
import RecentTransactionsForm from "./forms/RecentTransactionsForm.tsx";

export default function Dashboard() {
    return (
        <div id="webcrumbs">
            <div className="w-[1024px] p-6 bg-gradient-to-br from-slate-50 to-slate-100 font-sans rounded-xl shadow-lg">
                <Header/>

                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                    <AddTransactionForm/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <BalanceCard/>
                    <IncomeCard/>
                    <ExpensesCard/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <MonthlyOverviewChart/>
                    <CategoriesChart/>
                </div>

                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <BudgetProgress/>
                        <CategoryDetails/>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <RecentTransactionsForm/>
                </div>
            </div>
        </div>
    )
}