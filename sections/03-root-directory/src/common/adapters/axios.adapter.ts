import axios, { AxiosInstance } from 'axios';
import { HttpAdapter, HttpRequestOptions } from '../interfaces/http-adapter.interface';
import { Injectable } from '@nestjs/common';

/**
 * AxiosAdapter implements the HttpAdapter interface using the Axios library to perform HTTP requests.
 */
@Injectable()
export class AxiosAdapter implements HttpAdapter {
    private readonly axios: AxiosInstance = axios;

    async get<T>(url: string, options?: HttpRequestOptions): Promise<T> {
        const { data } = await this.axios.get<T>(url, {
            headers: options?.headers,
            params: options?.params,
            timeout: options?.timeoutMs,
        });

        return data;
    }
}