// lib/server-api-client.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * This client should ONLY be imported in getServerSideProps or getStaticProps
 * DO NOT import this in components or client-side code
 */
class ServerApiClient {
    private static instance: ServerApiClient;
    private client: AxiosInstance;

    private constructor() {

        const baseURL = process.env.API_BASE_URL;
        const serviceToken = process.env.API_SERVICE_TOKEN;

        if (!baseURL || !serviceToken) {
            throw new Error('API_BASE_URL and API_SERVICE_TOKEN must be defined in environment variables');
        }

        this.client = axios.create({
            baseURL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${serviceToken}`
            }
        });
    }

    public static getInstance(): ServerApiClient {
        if (!ServerApiClient.instance) {
            ServerApiClient.instance = new ServerApiClient();
        }
        return ServerApiClient.instance;
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.get<T>(url, config);
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.post<T>(url, data, config);
    }

    public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.put<T>(url, data, config);
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.delete<T>(url, config);
    }
}

// Only export the function to get the instance, not the class directly
export const getServerApiClient = () => ServerApiClient.getInstance();