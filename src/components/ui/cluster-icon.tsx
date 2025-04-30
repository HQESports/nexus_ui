"use client"

import { Layers } from "lucide-react"

interface ClusterIconProps {
    size?: number
    primaryColor?: string
    className?: string
}

export default function ClusterIcon({ size = 24, primaryColor = "currentColor", className = "" }: ClusterIconProps) {
    const colorClass = "text-purple-600 dark:text-purple-400"

    return (
        <div className={`relative ${className}`} style={{ height: size, width: size }}>
            {/* Circles */}
            <div
                className={`absolute border-2 rounded-full ${colorClass}`}
                style={{
                    top: size / 12,
                    left: size / 12,
                    height: (size * 5) / 12,
                    width: (size * 5) / 12,
                    borderColor: primaryColor,
                }}
            ></div>
            <div
                className={`absolute border-2 rounded-full ${colorClass}`}
                style={{
                    top: size / 2,
                    left: size / 2,
                    height: (size * 5) / 12,
                    width: (size * 5) / 12,
                    borderColor: primaryColor,
                }}
            ></div>
            <div
                className={`absolute border-2 rounded-full ${colorClass}`}
                style={{
                    top: size / 12,
                    left: size / 2,
                    height: (size * 5) / 12,
                    width: (size * 5) / 12,
                    borderColor: primaryColor,
                }}
            ></div>

            {/* Data points */}
            <div
                className={`absolute rounded-full ${colorClass}`}
                style={{
                    top: "25%",
                    left: "25%",
                    height: size / 12,
                    width: size / 12,
                    backgroundColor: primaryColor,
                }}
            ></div>
            <div
                className={`absolute rounded-full ${colorClass}`}
                style={{
                    top: "65%",
                    left: "65%",
                    height: size / 12,
                    width: size / 12,
                    backgroundColor: primaryColor,
                }}
            ></div>
            <div
                className={`absolute rounded-full ${colorClass}`}
                style={{
                    top: "25%",
                    left: "65%",
                    height: size / 12,
                    width: size / 12,
                    backgroundColor: primaryColor,
                }}
            ></div>

            {/* Dashed circle */}
            <div
                className={`absolute border rounded-full border-dashed opacity-50 ${colorClass}`}
                style={{
                    top: size / 4,
                    left: size / 4,
                    height: size / 2,
                    width: size / 2,
                    borderColor: primaryColor,
                }}
            ></div>

            <Layers
                className={`absolute bottom-0 right-0 ${colorClass}`}
                style={{
                    height: size / 4,
                    width: size / 4,
                    color: primaryColor,
                }}
            />
        </div>
    )
}
