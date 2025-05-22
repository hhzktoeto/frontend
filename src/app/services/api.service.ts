import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {ApiV1Path} from '../constants/api-v1-path';
import {environment} from "../../environments/environment";

@Injectable({providedIn: "root"})
export class ApiService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = environment.apiUrl;

    async getAll<T>(path: ApiV1Path): Promise<T[]> {
        return firstValueFrom(
            this.http.get<T[]>(this.fullUri(path))
        );
    }

    async add<TRequest, TResponse>(path: ApiV1Path, data: TRequest): Promise<TResponse> {
        return firstValueFrom(
            this.http.post<TResponse>(this.fullUri(path), data)
        );
    }

    async update<T>(path: ApiV1Path, data: T): Promise<T> {
        return firstValueFrom(
            this.http.put<T>(this.fullUri(path), data)
        );
    }

    async delete(path: ApiV1Path, id: number): Promise<void> {
        return firstValueFrom(
            this.http.delete<void>(this.fullUri(path).concat("/").concat(id.toString()))
        );
    }

    private fullUri(apiPath: ApiV1Path): string {
        return this.apiUrl.concat(apiPath);
    }
}
