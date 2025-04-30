import { DateRangePickerProps } from "@/components/ui/date-range-picker"

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
    Baltic_Main: "/maps/Erangel_Main_No_Text_High_Res.png",
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

// Phase options
export const PHASE_OPTIONS = [
    { id: 1, label: "Phase 1" },
    { id: 2, label: "Phase 2" },
    { id: 3, label: "Phase 3" },
    { id: 4, label: "Phase 4" },
    { id: 5, label: "Phase 5" },
    { id: 6, label: "Phase 6" },
    { id: 7, label: "Phase 7" },
    { id: 8, label: "Phase 8" },
]

export const DEFAULT_DATE_RANGE = {
    from: new Date(new Date().getTime() - 14 * 24 * 60 * 60 * 1000), // 7 days ago
    to: new Date()
}

export const DEFAULT_MAP_OPTION = MAP_OPTIONS[0].id
export const DEFAULT_TYPE_OPTION = MATCH_TYPE_OPTIONS.map((option) => option.id)

export const DEFAULT_LIMIT = 1000
export const LIMIT_MAX = 10000
export const LIMIT_MIN = 100

export const PARAM_NAMES = {
    MAP: "map",
    FROM_DATE: "fromDate",
    TO_DATE: "toDate",
    MATCH_TYPES: "types",
    STYLE: "style",
    PHASES: "phases",
    LIMIT: "limit",
}

// Style options
export const STYLE_OPTIONS = [
    { id: "circles", label: "Circles" },
    { id: "dots", label: "Dots" },
    { id: "circles-outline", label: "Circles Outline" },
]

export const DEFAULT_STYLE = STYLE_OPTIONS[0].id
export const DEFAULT_PHASES = PHASE_OPTIONS.filter((option) => option.id > 5).map((option) => option.id)

export const PHASE_COLORS: Record<number, string> = {
    1: "255,0,0",    // Bright red (hottest)
    2: "255,69,0",   // Red-orange
    3: "255,165,0",  // Orange
    4: "255,255,0",  // Yellow
    5: "0,255,0",    // Green
    6: "0,255,255",  // Cyan
    7: "0,114,255",  // Medium blue
    8: "0,0,255",    // Deep blue (coldest)
    0: "204,204,204" // Default: Light gray
}

export const DEFAULT_CANVAS_SIZE = 600
export const PUBG_MAP_SIZE = 816000
export const PUBG_MAP_SCALE = DEFAULT_CANVAS_SIZE / PUBG_MAP_SIZE