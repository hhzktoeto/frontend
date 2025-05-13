import type {Category, CategoryDTO} from "../types/Category.ts";
import {add, getAll} from "../api/api.ts";
import {ApiPath} from "../api/ApiPath.ts";

export async function getCategories(): Promise<Array<Category>> {
    return getAll<Category>(ApiPath.Categories);
}

export async function createNewCategory(category: CategoryDTO): Promise<Category> {
    return add<CategoryDTO, Category>(ApiPath.Categories, category)
}