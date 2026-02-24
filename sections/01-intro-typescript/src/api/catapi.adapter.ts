import axios from 'axios';

export interface HttpAdapter {
    get<T>( url: string): Promise<T>;
}

export class CatAPIFetcher implements HttpAdapter {
    
    async get<T>( url : string): Promise<T> {
        const response = await fetch(url);
        const data: T = await response.json();
        return data;
    }
}

export class CatAPIAdapter implements HttpAdapter {
    private readonly axios = axios;

    async get<T>( url : string) {
        const { data } = await this.axios.get<T>(url);
        return data;
    }

    async post( url : string, data : any){
        const response = await this.axios.post(url, data);
        return response.data;
    }

    async patch( url : string, data : any){
        const response = await this.axios.patch(url, data);
        return response.data;
    }

    async delete( url : string, data : any){
        const response = await this.axios.delete(url, { data });
        return response.data;
    }
}