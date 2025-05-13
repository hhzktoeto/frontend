import axios, {type AxiosResponse} from "axios";
import {ApiPath} from "./ApiPath.ts";

const api = axios.create({
    baseURL: 'http://localhost:8080'
});

export async function getAll<TResponse>(path: ApiPath): Promise<Array<TResponse>> {
    const response: AxiosResponse = await api.get(path);
    return response.data;
}

export async function add<TRequest, TResponse>(path: ApiPath, dto: TRequest): Promise<TResponse> {
    const response: AxiosResponse = await api.post(path, dto);
    return response.data;
}