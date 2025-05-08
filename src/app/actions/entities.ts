import { getServerApiClient } from "@/lib/api-client";
import { ActionReturn } from "./matches";

export interface Entity {
    id: string;
    name: string;
    active: boolean;
    created_at: Date;
}

export interface TournamentsResponse {
    count: number;
    tournaments: Entity[];
}

export interface PlayersResponse {
    count: number;
    players: Entity[];
}

export async function getPlayers(page: number, pageSize: number): Promise<ActionReturn<PlayersResponse>> {
    try {
        const apiClient = getServerApiClient();
        const response = await apiClient.get<PlayersResponse>(`/api/pubg/players?page=${page}&page_size=${pageSize}`);

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

export async function getTournaments(page: number, pageSize: number): Promise<ActionReturn<PlayersResponse>> {
    try {
        const apiClient = getServerApiClient();
        const response = await apiClient.get<PlayersResponse>(`/api/pubg/tournaments?page=${page}&page_size=${pageSize}`);

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