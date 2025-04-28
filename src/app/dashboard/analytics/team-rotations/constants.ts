import { Building2, Cat, IconNode, LucideIcon, Rocket, Snowflake, Trees, Wheat } from "lucide-react";
import { cactus } from '@lucide/lab';

// Filter types
export const FILTER_TYPES = {
    ALL: "all",
    SCRIM: "scrim",
    EVENT: "event",
} as const

export const DEFAULT_DATES = {
    from: new Date(new Date().setDate(new Date().getDate() - 21)),
    to: new Date(),
}

export const MAP_FILTERS = {
    ALL: "all",
    TIGER: "Tiger_Main",
    KIKI: "Kiki_Main",
    BALTIC: "Baltic_Main",
    DESERT: "Desert_Main",
} as const

// Map options
export const ROTATION_MAP_OPTIONS = [
    { value: "all", label: "All" },
    { value: "Baltic_Main", label: "Erangel" },
    { value: "Desert_Main", label: "Miramar" },
    { value: "Neon_Main", label: "Rondo" },
    { value: "Tiger_Main", label: "Taego" },
    { value: "DihorOtok_Main", label: "Vikendi" },
    { value: "Kiki_Main", label: "Deston" },
]

export interface MapInfo {
    displayName: string;
    color: "blue" | "green" | "yellow" | "orange" | "purple" | "red" | "lime";
    icon: "trees" | "cactus" | "rocket" | "wheat" | "snowflake" | "building-2"
}

export const bgColorMap = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    orange: "bg-orange-400",
    purple: "bg-purple-500",
    red: "bg-rose-600",
    lime: "bg-lime-500"
}

export const textColorMap = {
    blue: "text-blue-500",
    green: "text-green-500",
    yellow: "text-yellow-500",
    orange: "text-orange-400",
    purple: "text-purple-500",
    red: "text-rose-600",
    lime: "text-lime-500"
}

export const bgTypeMap = {
    ranked: "bg-amber-500",
    scrim: "bg-blue-600",
    event: "bg-orange-600"
}

export const MAP_INFO: Record<string, MapInfo> = {
    "Baltic_Main": {
        displayName: "Erangel",
        color: "green",
        icon: "trees"
    },
    "Desert_Main": {
        displayName: "Miramar",
        color: "orange",
        icon: "cactus"
    },
    "Neon_Main": {
        displayName: "Rondo",
        color: "purple",
        icon: "rocket"
    },
    "Tiger_Main": {
        displayName: "Taego",
        color: "lime",
        icon: "wheat"
    },
    "DihorOtok_Main": {
        displayName: "Vikendi",
        color: "blue",
        icon: "snowflake"
    },
    "Kiki_Main": {
        displayName: "Deston",
        color: "red",
        icon: "building-2"
    }
};

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
