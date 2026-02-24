import axios from 'axios';

export class CatAPIAdapter {
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