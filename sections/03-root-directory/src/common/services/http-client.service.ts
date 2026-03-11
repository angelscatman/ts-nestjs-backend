import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { lastValueFrom } from 'rxjs';

/**
 * HttpClientService is a wrapper around the HttpService provided by @nestjs/axios.
 * It provides a simplified interface for making HTTP requests and handling responses.
 * This service can be extended in the future to include additional HTTP methods (POST, PUT, DELETE, etc.)
 * and to implement common error handling logic.
 */
@Injectable()
export class HttpClientService {
  constructor(private readonly httpService: HttpService) {}

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await lastValueFrom(this.httpService.get<T>(url, config));
    return data;
  }
}
