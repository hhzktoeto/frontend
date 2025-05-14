export default function Expenses() {
    return (
        <div
            className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Расходы</h2>
                <span className="material-symbols-outlined text-red-500">trending_down</span>
            </div>
            <p className="text-3xl font-bold mb-2">$2,846.33</p>
            <div className="flex items-center text-red-500">
                <span className="material-symbols-outlined text-sm mr-1">arrow_downward</span>
                <span className="text-sm">+$320 from last month</span>
            </div>
        </div>
    )
}