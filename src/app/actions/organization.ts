"use server"

import { getServerApiClient } from "@/lib/api-client";
import { Organization } from "../organizations/organization-list";

export interface ActionReturn<T> {
    success: boolean,
    data: T | undefined;
    error: string | undefined;
}

export async function GetOrganizations(): Promise<ActionReturn<Organization[]>> {
    try {
        const apiClient = getServerApiClient();
        const response = await apiClient.get<Organization[]>('/api/organizations');

        return {
            success: true,
            data: response.data,
            error: undefined
        };
    } catch (error) {
        console.error('Failed to fetch match distribution:', error);

        return {
            success: false,
            data: undefined,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        };
    }
}

export async function createOrganization(formData: FormData) {
    // Validation
    const name = formData.get('name') as string;
    if (!name || name.trim() === '') {
        throw new Error('Organization name is required');
    }

    try {
        const apiClient = getServerApiClient();

        // Ensure the right headers are set for multipart/form-data
        // The FormData object should automatically set the correct Content-Type
        // but we're making it explicit here
        const response = await apiClient.post('/api/organizations', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error: any) {
        console.error('Failed to create organization:', error);

        // Check if the error response contains data with an error message
        if (error.response && error.response.data) {
            const errorMessage = error.response.data.message || error.response.data.error || JSON.stringify(error.response.data);
            throw new Error(errorMessage);
        }

        // If the error message is directly in the error object, use that
        if (error.message) {
            throw new Error(error.message);
        }

        // Fallback to a generic message
        throw new Error('Failed to create organization');
    }
}

export async function updateOrganization(organizationId: string, formData: FormData): Promise<ActionReturn<any>> {
    // Validation
    const name = formData.get('name') as string;
    if (!name || name.trim() === '') {
        return {
            success: false,
            data: undefined,
            error: 'Organization name is required'
        };
    }

    try {
        const apiClient = getServerApiClient();

        // Use PUT method for updating
        const response = await apiClient.put(`/api/organizations/${organizationId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return {
            success: true,
            data: response.data,
            error: undefined
        };
    } catch (error: any) {
        console.error('Failed to update organization:', error);

        // Handle error responses
        if (error.response && error.response.data) {
            const errorMessage = error.response.data.message || error.response.data.error || JSON.stringify(error.response.data);
            return {
                success: false,
                data: undefined,
                error: errorMessage
            };
        }

        return {
            success: false,
            data: undefined,
            error: error.message || 'Failed to update organization'
        };
    }
}

export async function deleteOrganization(organizationId: string): Promise<ActionReturn<boolean>> {
    try {
        const apiClient = getServerApiClient();

        // Use DELETE method
        await apiClient.delete(`/api/organizations/${organizationId}`);

        return {
            success: true,
            data: true,
            error: undefined
        };
    } catch (error: any) {
        console.error('Failed to delete organization:', error);

        // Handle error responses
        if (error.response && error.response.data) {
            const errorMessage = error.response.data.message || error.response.data.error || JSON.stringify(error.response.data);
            return {
                success: false,
                data: undefined,
                error: errorMessage
            };
        }

        return {
            success: false,
            data: undefined,
            error: error.message || 'Failed to delete organization'
        };
    }
}