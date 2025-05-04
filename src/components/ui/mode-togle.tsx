"use client"

import { useState } from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import ClusterIcon from "./cluster-icon"
import ReducerIcon from "./reducer-icon"
import { AnalyzeModes, DEFAULT_ANALYZE_MODE } from "@/lib/constants"

export interface ModeToggleProps {
    size?: "sm" | "md" | "lg"
    onModeChange?: (mode: AnalyzeModes) => void
    reducerColor?: string
    clusterColor?: string
    className?: string
}

export default function ModeToggle({
    size = "md",
    onModeChange,
    reducerColor = "#3B82F6", // blue-500
    clusterColor = "#8B5CF6", // purple-500
    className,
}: ModeToggleProps) {
    const [mode, setMode] = useState<AnalyzeModes>(AnalyzeModes.None)

    const handleModeChange = (newMode: AnalyzeModes) => {
        // If clicking the currently selected mode, set to None
        const updatedMode = mode === newMode ? AnalyzeModes.None : newMode;
        setMode(updatedMode);
        onModeChange?.(updatedMode);
    }

    // Size mappings
    const sizeMap = {
        sm: {
            container: "h-10 w-[200px]",
            icon: 24,
            text: "text-xs",
        },
        md: {
            container: "h-12 w-[240px]",
            icon: 32,
            text: "text-sm",
        },
        lg: {
            container: "h-14 w-[280px]",
            icon: 40,
            text: "text-base",
        },
    }

    return (
        <div
            className={cn(
                "relative flex rounded-full border bg-background p-1 shadow-sm",
                sizeMap[size].container,
                className,
            )}
        >

            {/* Background indicator */}
            <motion.div
                className="absolute inset-0 z-0 rounded-full"
                initial={false}
                animate={{
                    backgroundColor: mode === AnalyzeModes.Reducer ? "rgba(59, 130, 246, 0.1)" : "rgba(139, 92, 246, 0.1)",
                }}
                transition={{ duration: 0.2 }}
            />

            {/* Sliding indicator */}
            <motion.div
                className="absolute z-10 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-full bg-white shadow-sm dark:bg-gray-800"
                initial={false}
                animate={{
                    x: mode === AnalyzeModes.Reducer
                        ? "4px"
                        : mode === AnalyzeModes.Cluster
                            ? "calc(100% + 4px)"
                            : "4px", // Default position when None
                    opacity: mode === AnalyzeModes.None ? 0 : 1 // Hide when no selection
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                }}
            />

            {/* Reducer button */}
            <button
                className={cn(
                    "relative z-20 flex flex-1 items-center justify-center gap-2 rounded-full py-1 transition-colors",
                    mode === AnalyzeModes.Reducer ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400",
                )}
                onClick={() => handleModeChange(AnalyzeModes.Reducer)}
                aria-pressed={mode === AnalyzeModes.Reducer}
            >
                <ReducerIcon
                    size={sizeMap[size].icon}
                    primaryColor={mode === AnalyzeModes.Reducer ? reducerColor : "currentColor"}
                    secondaryColor={mode === AnalyzeModes.Reducer ? undefined : "currentColor"}
                />
                <span className={cn("font-medium", sizeMap[size].text)}>Reducer</span>
            </button>

            {/* Cluster button */}
            <button
                className={cn(
                    "relative z-20 flex flex-1 items-center justify-center gap-2 rounded-full py-1 transition-colors",
                    mode === AnalyzeModes.Cluster ? "text-purple-600 dark:text-purple-400" : "text-gray-500 dark:text-gray-400",
                )}
                onClick={() => handleModeChange(AnalyzeModes.Cluster)}
                aria-pressed={mode === AnalyzeModes.Cluster}
            >
                <ClusterIcon size={sizeMap[size].icon} primaryColor={mode === AnalyzeModes.Cluster ? clusterColor : "currentColor"} />
                <span className={cn("font-medium", sizeMap[size].text)}>
                    Cluster
                </span>
            </button>
        </div>
    )
}
