// app/actions/team.ts
'use server';

import { getServerApiClient } from "@/lib/api-client";
import { Match } from "./matches";

// Define the types for player rotations
export interface Position {
    x: number;
    y: number;
}

export interface PlayerRotation {
    name: string;
    rotation: Position[];
}

export type MatchTypes = "scrim" | "ranked" | "event"

export interface MatchDataTiny {
    ShardID: string;
    MapName: string;
    GameMode: string;
    Duration: number;
    CreatedAt: string;
    MatchType: MatchTypes;
    Processed: boolean;
}

export interface TeamRotationTiny {
    id: string;
    match_id: string;
    team_id: string;
    match: MatchDataTiny;
    created_at: string;
    updated_at: string;
}

export interface TeamRotation {
    id: string;
    match_id: string;
    team_id: string;
    match: Match;
    player_rotations: PlayerRotation[];
    created_at: string;
    updated_at: string;
}

// Type definitions
export interface Player {
    name: string;
    isPriority: boolean;
    liveServerIGN: string;
    eventServerIGN: string;
}

export interface Team {
    id: string; // MongoDB document ID
    name: string;
    imageUrl: string;
    esportTag: string;
    searchCount: 2 | 3 | 4;
    players: Player[];
}

export interface TeamRequest {
    name: string;
    esportTag: string;
    searchCount: 2 | 3 | 4;
    players: Player[];
}

export interface TeamResponse {
    id: string;
    name: string;
    imageUrl: string;
    esportTag: string;
    searchCount: 2 | 3 | 4;
    players: Player[];
}

// Response type definition
export interface ActionReturn<T> {
    success: boolean;
    data?: T;
    error?: string;
}

/**
 * Gets a team's rotations by team ID
 */
export async function getTeamRotations(
    teamId: string, startDate: Date, endDate: Date
): Promise<ActionReturn<TeamRotationTiny[]>> {
    try {
        const apiClient = getServerApiClient();
        const response = await apiClient.get<TeamRotationTiny[]>(
            `/api/teams/rotations/${teamId}`,
            {
                params: {
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                },
            }
        );

        return {
            success: true,
            data: response.data,
            error: undefined,
        };
    } catch (error) {
        console.error(`Failed to get rotations for team ${teamId}:`, error);
        return {
            success: false,
            data: undefined,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        };
    }
}

export async function getRotation(
    rotationId: string
): Promise<ActionReturn<TeamRotation>> {
    try {
        const apiClient = getServerApiClient();
        const response = await apiClient.get<TeamRotation>(`/api/teams/rotation/${rotationId}`);

        return {
            success: true,
            data: response.data,
            error: undefined,
        };
    } catch (error) {
        console.error(`Failed to get rotations for team ${rotationId}:`, error);
        return {
            success: false,
            data: undefined,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        };
    }
}



/**
 * Creates a new team with the provided data and image
 */
export async function createTeam(
    formData: FormData
): Promise<ActionReturn<TeamResponse>> {
    try {
        const apiClient = getServerApiClient();
        const response = await apiClient.post<TeamResponse>(
            '/api/teams',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        return {
            success: true,
            data: response.data,
            error: undefined,
        };
    } catch (error) {
        console.error('Failed to create team:', JSON.stringify(error));
        return {
            success: false,
            data: undefined,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        };
    }
}

/**
 * Updates an existing team by ID
 */
export async function updateTeam(
    teamId: string,
    formData: FormData
): Promise<ActionReturn<TeamResponse>> {
    try {
        const apiClient = getServerApiClient();
        const response = await apiClient.put<TeamResponse>(
            `/api/teams/${teamId}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        return {
            success: true,
            data: response.data,
            error: undefined,
        };
    } catch (error) {
        console.error(`Failed to update team ${teamId}:`, error);
        return {
            success: false,
            data: undefined,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        };
    }
}

/**
 * Deletes a team by ID
 */
export async function deleteTeam(
    teamId: string
): Promise<ActionReturn<void>> {
    try {
        const apiClient = getServerApiClient();
        await apiClient.delete(`/api/teams/${teamId}`);

        return {
            success: true,
            error: undefined,
        };
    } catch (error) {
        console.error(`Failed to delete team ${teamId}:`, error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        };
    }
}

/**
 * Gets a team by ID
 */
export async function getTeam(
    teamId: string
): Promise<ActionReturn<TeamResponse>> {
    try {
        const apiClient = getServerApiClient();
        const response = await apiClient.get<TeamResponse>(`/api/teams/${teamId}`);

        return {
            success: true,
            data: response.data,
            error: undefined,
        };
    } catch (error) {
        console.error(`Failed to get team ${teamId}:`, error);
        return {
            success: false,
            data: undefined,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        };
    }
}

/**
 * Gets all teams
 */
export async function getTeams(): Promise<ActionReturn<TeamResponse[]>> {
    try {
        const apiClient = getServerApiClient();
        const response = await apiClient.get<TeamResponse[]>('/api/teams');

        return {
            success: true,
            data: response.data,
            error: undefined,
        };
    } catch (error) {
        console.error('Failed to get teams:', error);
        return {
            success: false,
            data: undefined,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        };
    }
}

