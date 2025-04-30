"use client"

import { useState } from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import ClusterIcon from "@/components/ui/cluster-icon"
import ReducerIcon from "@/components/ui/reducer-icon"


export interface ModeToggleProps {
    defaultMode?: "reducer" | "cluster"
    size?: "sm" | "md" | "lg"
    onModeChange?: (mode: "reducer" | "cluster") => void
    reducerColor?: string
    clusterColor?: string
    className?: string
}

export default function ModeToggle({
    defaultMode = "reducer",
    size = "md",
    onModeChange,
    reducerColor = "#3B82F6", // blue-500
    clusterColor = "#8B5CF6", // purple-500
    className,
}: ModeToggleProps) {
    const [mode, setMode] = useState<"reducer" | "cluster">(defaultMode)

    const handleModeChange = (newMode: "reducer" | "cluster") => {
        setMode(newMode)
        onModeChange?.(newMode)
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
                className="absolute inset-0 z-0 rounded-full bg-white"
                initial={false}
                animate={{
                    backgroundColor: mode === "reducer" ? "rgba(59, 130, 246, 0.1)" : "rgba(139, 92, 246, 0.1)",
                }}
                transition={{ duration: 0.2 }}
            />

            {/* Sliding indicator */}
            <motion.div
                className="absolute z-10 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-full bg-white shadow-sm dark:bg-gray-800"
                initial={false}
                animate={{
                    x: mode === "reducer" ? "4px" : "calc(100% + 4px)",
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
                    mode === "reducer" ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400",
                )}
                onClick={() => handleModeChange("reducer")}
                aria-pressed={mode === "reducer"}
            >
                <ReducerIcon
                    size={sizeMap[size].icon}
                    primaryColor={mode === "reducer" ? reducerColor : "currentColor"}
                    secondaryColor={mode === "reducer" ? undefined : "currentColor"}
                />

            </button>

            {/* Cluster button */}
            <button
                className={cn(
                    "relative z-20 flex flex-1 items-center justify-center gap-2 rounded-full py-1 transition-colors",
                    mode === "cluster" ? "text-purple-600 dark:text-purple-400" : "text-gray-500 dark:text-gray-400",
                )}
                onClick={() => handleModeChange("cluster")}
                aria-pressed={mode === "cluster"}
            >
                <ClusterIcon size={sizeMap[size].icon} primaryColor={mode === "cluster" ? clusterColor : "currentColor"} />
            </button>
        </div>
    )
}
