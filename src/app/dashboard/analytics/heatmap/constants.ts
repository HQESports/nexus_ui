// Define parameter names and default values in a single place
export const PARAM_NAMES = {
    MAP: "map",
    FROM_DATE: "from",
    TO_DATE: "to",
    MATCH_TYPES: "types",
    STYLE: "style",
    PHASES: "phases",
}

export const DEFAULT_VALUES = {
    MAP: "Baltic_Main",
    MATCH_TYPES: ["ranked"],
    STYLE: "dots",
    PHASES: [],
}

// Map options
export const MAP_OPTIONS = [
    { id: "Baltic_Main", label: "Erangel" },
    { id: "Desert_Main", label: "Miramar" },
    { id: "Neon_Main", label: "Rondo" },
    { id: "Tiger_Main", label: "Taego" },
    { id: "DihorOtok_Main", label: "Vikendi" },
    { id: "Kiki_Main", label: "Deston" },
]

// Map image paths
export const MAP_IMAGES: Record<string, string> = {
    Baltic_Main: "/maps/Erangel_Main_No_Text_Low_Res.png",
    Desert_Main: "/maps/Miramar_Main_No_Text_Low_Res.png",
    Neon_Main: "/maps/Rondo_Main_No_Text_Low_Res.png",
    Tiger_Main: "/maps/Taego_Main_No_Text_Low_Res.png",
    DihorOtok_Main: "/maps/Vikendi_Main_No_Text_Low_Res.png",
    Kiki_Main: "/maps/Deston_Main_No_Text_Low_Res.png",
    // Default fallback for any undefined maps
    default: "/placeholder.svg?height=700&width=700&query=Default game map",
}

// Match type options
export const MATCH_TYPE_OPTIONS = [
    { id: "event", label: "Event" },
    { id: "scrim", label: "Scrim" },
    { id: "ranked", label: "Ranked" },
]

// Style options
export const STYLE_OPTIONS = [
    { id: "dots", label: "Dots" },
    { id: "circles", label: "Circles" },
    { id: "circles-outline", label: "Circles Outline" },
]

// Phase options
export const PHASE_OPTIONS = [
    { id: "1", label: "Phase 1" },
    { id: "2", label: "Phase 2" },
    { id: "3", label: "Phase 3" },
    { id: "4", label: "Phase 4" },
    { id: "5", label: "Phase 5" },
    { id: "6", label: "Phase 6" },
    { id: "7", label: "Phase 7" },
]
