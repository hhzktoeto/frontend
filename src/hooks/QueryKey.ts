export const QueryKey = {
    Transactions: ["transactions"],
    Categories: ["categories"]
} as const

export type QueryKey = typeof QueryKey[keyof typeof QueryKey];