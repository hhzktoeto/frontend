import {useMutation, useQuery} from "@tanstack/react-query";
import {categoryService} from "../services/CategoryService";
import {transactionService} from "../services/TransactionService";
import {queryClient} from "../queryClient";
import type {Transaction} from "../types/Transaction";
import {QueryKey} from "./QueryKey";

export function useCategoriesQuery() {
    return useQuery({
        queryKey: QueryKey.Categories,
        queryFn: categoryService.getAllCategories,
    });
}

export function useTransactionsQuery() {
    return useQuery({
        queryKey: QueryKey.Transactions,
        queryFn: transactionService.getAll
    })
}

export function useCreateTransactionMutation() {
    return useMutation({
        mutationFn: transactionService.create,
        onSuccess: async (newTransaction) => {
            queryClient.setQueryData<Array<Transaction>>(["transactions"], (old = []) =>
            [newTransaction, ...old]);
            await queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
}
