// Define parameter names and default values in a single place
export const PARAM_NAMES = {
    MAP: "map_name",
    FROM_DATE: "start_date",
    TO_DATE: "end_date",
    THRESHOLD: "threshold",
    OVERLAY_COLOR: "overlay_color",
    OVERLAY_OPACITY: "overlay_opacity",
}

export const DEFAULT_VALUES = {
    MAP: "Baltic_Main",
    FROM_DATE: new Date("2024-01-01"),
    TO_DATE: new Date(),
    THRESHOLD: 0.1,
    OVERLAY_COLOR: "FF0000",
    OVERLAY_OPACITY: 128,
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

