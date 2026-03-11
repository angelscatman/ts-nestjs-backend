
/**
 * Defines the HttpAdapter interface for making HTTP requests to external APIs.
 */
export interface HttpRequestOptions {
    headers?: Record<string, string>;
    params?: Record<string, string | number | boolean>;
    timeoutMs?: number;
}

export interface HttpAdapter {
    get<T>(url: string, options?: HttpRequestOptions): Promise<T>;
}