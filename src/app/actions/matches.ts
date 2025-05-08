// app/actions/filtered-matches.ts
'use server'

import { getServerApiClient } from "@/lib/api-client";

export interface SafeZone {
    Phase: number;
    X: number;
    Y: number;
    Radius: number;
}

export interface PlanePath {
    StartX: number;
    StartY: number;
    EndX: number;
    EndY: number;
}

export interface TelemetryData {
    SafeZones: SafeZone[];
    PlanePath: PlanePath;
}

export interface Match {
    MatchID: string;
    ShardID: string;
    MapName: string;
    GameMode: string;
    Duration: number;
    IsCustomMatch: boolean;
    CreatedAt: string;
    MatchType: string;
    Processed: boolean;
    ProcessedAt: string;
    ImportedAt: string;
    PlayerCount: number;
    TeamCount: number;
    TelemetryURL: string;
    TelemetryData: TelemetryData;
}

export interface FilteredMatchesResponse {
    matches: Match[];
    count: number;
    filter: {
        mapName: string;
        matchTypes: string[];
        startDate: string | null;
        endDate: string | null;
        limit: number;
    }
}

export interface FilteredMatchResponse {
    matches: Match;
    filter: {
        mapName: string;
        matchTypes: string[];
        startDate: string | null;
        endDate: string | null;
        limit: number;
    }
}


export interface ActionReturn<T> {
    success: boolean;
    data: T | undefined;
    error: string | undefined;
}

export interface FilteredMatchesParams {
    mapName: string;
    matchTypes?: string[];
    from?: string | null;
    to?: string | null;
    limit?: number;
}

/**
 * Fetches matches filtered by various criteria
 * @param params Filter parameters
 * @returns The filtered matches data or an error object
 */

export async function getFilteredMatches(params: FilteredMatchesParams): Promise<ActionReturn<FilteredMatchesResponse>> {
    try {
        const apiClient = getServerApiClient();

        // Build query parameters
        const queryParams = new URLSearchParams();
        queryParams.append('map_name', params.mapName);

        if (params.matchTypes && params.matchTypes.length > 0) {
            queryParams.append('match_type', params.matchTypes.join(','));
        }

        if (params.from) {
            queryParams.append('start_date', params.from);
        }

        if (params.to) {
            queryParams.append('end_date', params.to);
        }

        if (params.limit) {
            queryParams.append('limit', params.limit.toString());
        }

        const response = await apiClient.get<FilteredMatchesResponse>(`/api/pubg/matches?${queryParams.toString()}`);

        return {
            success: true,
            data: response.data,
            error: undefined
        };
    } catch (error) {
        console.error('Failed to fetch filtered matches:', error);

        return {
            success: false,
            data: undefined,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        };
    }
}

export async function getMatchById(matchId: string): Promise<ActionReturn<FilteredMatchResponse>> {
    try {
        const apiClient = getServerApiClient();

        const response = await apiClient.get<FilteredMatchResponse>(`/api/pubg/matches/${matchId}`);

        return {
            success: true,
            data: response.data,
            error: undefined
        };
    }
    catch (error) {
        console.error('Failed to fetch match by ID:', error);

        return {
            success: false,
            data: undefined,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        };
    }
}

/**
 * Fetches matches filtered by various criteria
 * @param params Filter parameters
 * @returns The filtered matches data or an error object
 */

export async function getFilteredRandomMatch(params: FilteredMatchesParams): Promise<ActionReturn<FilteredMatchResponse>> {
    try {
        const apiClient = getServerApiClient();

        // Build query parameters
        const queryParams = new URLSearchParams();
        queryParams.append('map_name', params.mapName);

        if (params.matchTypes && params.matchTypes.length > 0) {
            queryParams.append('match_type', params.matchTypes.join(','));
        }

        if (params.from) {
            queryParams.append('start_date', params.from);
        }

        if (params.to) {
            queryParams.append('end_date', params.to);
        }

        if (params.limit) {
            queryParams.append('limit', params.limit.toString());
        }

        const response = await apiClient.get<FilteredMatchResponse>(`/api/pubg/matches/random?${queryParams.toString()}`);

        return {
            success: true,
            data: response.data,
            error: undefined
        };
    } catch (error) {
        console.error('Failed to fetch filtered matches:', error);

        return {
            success: false,
            data: undefined,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        };
    }
}