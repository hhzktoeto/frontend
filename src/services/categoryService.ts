import type {Category} from "../types/Category.ts";
import {getAllCategories} from "./api.ts";

let categoryCache: Category[] = [];

export async function getCategories(): Promise<Category[]> {
    if (categoryCache.length === 0) {
        await updateCategories()
    }
    return categoryCache
}

export async function updateCategories(): Promise<void> {
    categoryCache = await getAllCategories()
}