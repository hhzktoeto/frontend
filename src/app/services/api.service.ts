import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {ApiPath} from '../constants/api-path';

@Injectable({providedIn: "root"})
export class ApiService {
    private http = inject(HttpClient);

    async getAll<T>(path: ApiPath): Promise<T[]> {
        return firstValueFrom(
            this.http.get<T[]>(path)
        );
    }

    async add<TRequest, TResponse>(path: ApiPath, data: TRequest): Promise<TResponse> {
        return firstValueFrom(
            this.http.post<TResponse>(path, data)
        );
    }

    async update<T>(path: ApiPath, data: T): Promise<T> {
        return firstValueFrom(
            this.http.put<T>(path, data)
        );
    }

    async delete(path: ApiPath, id: number): Promise<void> {
        return firstValueFrom(
            this.http.delete<void>(path.concat("/").concat(id.toString()))
        );
    }
}
