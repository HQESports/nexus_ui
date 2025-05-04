export interface Player {
    name: string
    isPriority: boolean
    liveServerIGN: string
    eventServerIGN: string
}

export interface Team {
    id: string // MongoDB document ID
    name: string
    imageUrl: string
    esportTag: string
    searchCount: 2 | 3 | 4
    players: Player[]
}

export interface SimpleCircle {
    x: number;
    y: number;
    radius: number;
    trash: boolean;
    phase: number;
}