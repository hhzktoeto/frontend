import {inject, Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Category} from '../types/category';
import {ApiV1Path} from '../constants/api-v1-path';

@Injectable({providedIn: 'root'})
export class CategoryService {
    private readonly apiService = inject(ApiService)

    async getAll(): Promise<Category[]> {
        return this.apiService.getAll<Category>(ApiV1Path.CATEGORIES);
    }
}
