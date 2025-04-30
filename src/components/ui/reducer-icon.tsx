"use client"

import { ZoomIn } from "lucide-react"

interface ReducerIconProps {
    size?: number
    primaryColor?: string
    secondaryColor?: string
    className?: string
}

export default function ReducerIcon({
    size = 24,
    primaryColor = "currentColor",
    secondaryColor = "#9CA3AF", // gray-400
    className = "",
}: ReducerIconProps) {
    const primaryColorClass = "text-blue-600 dark:text-blue-400"
    const secondaryColorClass = "text-gray-400 dark:text-gray-500"

    return (
        <div className={`relative ${className}`} style={{ height: size, width: size }}>
            <div
                className={`absolute inset-0 border-2 rounded-full ${primaryColorClass}`}
                style={{ borderColor: primaryColor }}
            ></div>
            <div
                className={`absolute rounded-full border border-dashed ${primaryColorClass}`}
                style={{
                    inset: `${size / 6}px`,
                    borderColor: primaryColor,
                }}
            ></div>

            {/* Inside points */}
            <div
                className={`absolute rounded-full ${primaryColorClass}`}
                style={{
                    top: "30%",
                    left: "40%",
                    height: size / 12,
                    width: size / 12,
                    backgroundColor: primaryColor,
                }}
            ></div>
            <div
                className={`absolute rounded-full ${primaryColorClass}`}
                style={{
                    top: "50%",
                    left: "60%",
                    height: size / 12,
                    width: size / 12,
                    backgroundColor: primaryColor,
                }}
            ></div>
            <div
                className={`absolute rounded-full ${primaryColorClass}`}
                style={{
                    top: "70%",
                    left: "45%",
                    height: size / 12,
                    width: size / 12,
                    backgroundColor: primaryColor,
                }}
            ></div>

            {/* Outside points */}
            <div
                className={`absolute rounded-full ${secondaryColorClass}`}
                style={{
                    top: "20%",
                    left: "80%",
                    height: size / 12,
                    width: size / 12,
                    backgroundColor: secondaryColor,
                }}
            ></div>
            <div
                className={`absolute rounded-full ${secondaryColorClass}`}
                style={{
                    top: "80%",
                    left: "20%",
                    height: size / 12,
                    width: size / 12,
                    backgroundColor: secondaryColor,
                }}
            ></div>
            <div
                className={`absolute rounded-full ${secondaryColorClass}`}
                style={{
                    top: "85%",
                    left: "75%",
                    height: size / 12,
                    width: size / 12,
                    backgroundColor: secondaryColor,
                }}
            ></div>

            <ZoomIn
                className={`absolute bottom-0 right-0 ${primaryColorClass}`}
                style={{
                    height: size / 4,
                    width: size / 4,
                    color: primaryColor,
                }}
            />
        </div>
    )
}
