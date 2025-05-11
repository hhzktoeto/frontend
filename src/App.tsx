import {useEffect, useState} from "react";
import type {Transaction} from "./types/Transaction.ts";
import {getAllTransactions} from "./services/api.ts";

function App() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        getAllTransactions().then(setTransactions);
    }, []);

    return (
        <div>
            <h1>Money Manager</h1>
            <ul>
                {transactions.map(transaction => (
                    <li key={transaction.id}>
                        {transaction.date} | {transaction.category} | {transaction.amount}₽ | {transaction.type}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App
