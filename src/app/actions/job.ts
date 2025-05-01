// app/actions/job.ts
'use server'; // <-- This is crucial for server actions

import { getServerApiClient } from "@/lib/api-client"

// Response type definition
export interface ActionReturn<T> {
    success: boolean;
    data?: T;
    error?: string;
}

// Job type definition
export interface Job {
    id: string;
    type: string;
    status: "pending" | "processing" | "completed" | "failed" | "cancelled";
    tokenId: string;
    created_at: string;
    updated_at: string;
    results: any;
    metrics: {
        processed_items: number;
        success_count: number;
        warning_count: number;
        failure_count: number;
        invalid_count: number;
        batches_complete: number;
        total_batches: number;
    };
}

export interface JobType {
    job_type: string;
    job_name: string;
    job_description: string;
}

export interface ServerStatus {
    cache: boolean;
    database: boolean;
    rabbit: boolean;
    server: boolean;
    file_service: boolean;
}

export async function getJobs(): Promise<ActionReturn<Array<Job>>> {
    try {
        const apiClient = getServerApiClient();
        const response = await apiClient.get<Array<Job>>('/api/jobs');

        return {
            success: true,
            data: response.data,
            error: undefined
        };
    } catch (error) {
        console.error('Failed to fetch jobs:', error);

        return {
            success: false,
            data: undefined,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        };
    }
}

export async function getJobTypes(): Promise<ActionReturn<Array<JobType>>> {
    try {
        const apiClient = getServerApiClient();
        const response = await apiClient.get<Array<JobType>>('/api/jobs/types');

        return {
            success: true,
            data: response.data,
            error: undefined
        };
    } catch (error) {
        console.error('Failed to fetch job types:', error);

        return {
            success: false,
            data: undefined,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        };
    }
}

export async function startJob(jobType: string): Promise<ActionReturn<Job>> {
    try {
        const apiClient = getServerApiClient();
        const response = await apiClient.post<Job>('/api/jobs', {
            type: jobType,
            payload: {}
        });

        return {
            success: true,
            data: response.data,
            error: undefined
        };
    } catch (error) {
        return {
            success: false,
            data: undefined,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        };
    }
}

export async function cancelJob(jobType: string): Promise<ActionReturn<string>> {
    try {
        const apiClient = getServerApiClient();
        const response = await apiClient.delete<{ message: string, error: string }>(`/api/jobs/${jobType}`);

        return {
            success: true,
            data: response.data.message,
            error: undefined
        };
    } catch (error) {

        return {
            success: false,
            data: undefined,
            error: error instanceof Error ? "Can't cancel job" : 'An unknown error occurred',
        };
    }
}

export async function getServerStatus(): Promise<ActionReturn<ServerStatus>> {
    try {
        const apiClient = getServerApiClient();
        const response = await apiClient.get<ServerStatus>('/ready');
        response.data.server = true;

        return {
            success: true,
            data: response.data,
            error: undefined
        };
    } catch (error) {
        console.error('Failed to get server status:', error);

        return {
            success: false,
            data: undefined,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        };
    }
}