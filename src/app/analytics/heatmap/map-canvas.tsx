"use client"

import { useEffect, useRef, useState } from "react"
import { MAP_IMAGES } from "./constants"

// Define the types for the match data
interface SafeZone {
    Phase: number;
    X: number;
    Y: number;
    Radius: number;
}

interface TelemetryData {
    SafeZones: SafeZone[];
    PlanePath: {
        StartX: number;
        StartY: number;
        EndX: number;
        EndY: number;
    };
}

interface Match {
    MatchID: string;
    MapName: string;
    TelemetryData: TelemetryData;
    // Include other fields as needed
}

interface MapCanvasProps {
    selectedMap: string
    selectedStyle: string
    selectedPhases: string[]
    matches: Match[]
}

export function MapCanvas({ selectedMap, selectedStyle, selectedPhases, matches }: MapCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const imageRef = useRef<HTMLImageElement | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const renderedRef = useRef({ map: "", style: "", phases: [] as string[], matchesCount: 0 })

    // Canvas dimensions
    const canvasWidth = 700
    const canvasHeight = 700

    // Define map coordinate limits for different maps
    // Updated to use the correct range of 0-816000
    const mapBounds: Record<string, { minX: number, maxX: number, minY: number, maxY: number }> = {
        "Baltic_Main": { minX: 0, maxX: 816000, minY: 0, maxY: 816000 },
        // Add bounds for other maps as needed
        "default": { minX: 0, maxX: 816000, minY: 0, maxY: 816000 }
    }

    // Load and draw the map image when the component mounts or props change
    useEffect(() => {
        // Check if we need to redraw - only redraw if props have changed
        const currentRender = {
            map: selectedMap,
            style: selectedStyle,
            phases: [...selectedPhases],
            matchesCount: matches.length
        }
        const prevRender = renderedRef.current

        const hasChanged =
            prevRender.map !== currentRender.map ||
            prevRender.style !== currentRender.style ||
            prevRender.phases.join(",") !== currentRender.phases.join(",") ||
            prevRender.matchesCount !== currentRender.matchesCount

        if (!hasChanged) return

        // Update the rendered ref to prevent unnecessary redraws
        renderedRef.current = currentRender

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Set loading state
        setIsLoading(true)

        // Clear the canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight)

        // Create a new image or reuse existing one
        let img = imageRef.current
        if (!img || img.src.indexOf(selectedMap) === -1) {
            // Only create a new image if the map has changed
            img = new Image()
            img.crossOrigin = "anonymous" // Prevent CORS issues
            imageRef.current = img

            // Get the image path from the constants
            const imagePath = MAP_IMAGES[selectedMap] || MAP_IMAGES.default
            img.src = imagePath
        }

        // Draw the image when it loads
        const handleImageLoad = () => {
            if (!canvas || !ctx) return

            // Draw the image centered on the canvas
            ctx.drawImage(img!, 0, 0, canvasWidth, canvasHeight)

            // Filter matches for the selected map
            const filteredMatches = matches.filter(match => match.MapName === selectedMap)

            // Draw visualization based on selected style and phases
            drawVisualization(ctx, selectedStyle, selectedPhases, filteredMatches)

            // End loading state
            setIsLoading(false)
        }

        // If the image is already loaded, draw immediately
        if (img.complete) {
            handleImageLoad()
        } else {
            // Otherwise wait for it to load
            img.onload = handleImageLoad
        }

        // Clean up
        return () => {
            if (imageRef.current) {
                imageRef.current.onload = null
            }
        }
    }, [selectedMap, selectedStyle, selectedPhases, matches, canvasWidth, canvasHeight])

    // Convert game coordinates to canvas coordinates
    const gameToCanvasCoords = (x: number, y: number, mapName: string): { canvasX: number, canvasY: number } => {
        const bounds = mapBounds[mapName] || mapBounds.default

        // Make sure coordinates are within bounds
        const clampedX = Math.max(bounds.minX, Math.min(bounds.maxX, x))
        const clampedY = Math.max(bounds.minY, Math.min(bounds.maxY, y))

        // Normalize the coordinates between 0 and 1
        const normalizedX = (clampedX - bounds.minX) / (bounds.maxX - bounds.minX)
        const normalizedY = (clampedY - bounds.minY) / (bounds.maxY - bounds.minY)

        // Convert to canvas coordinates - keep 0,0 at top left
        return {
            canvasX: normalizedX * canvasWidth,
            canvasY: normalizedY * canvasHeight
        }
    }

    // Convert game radius to canvas radius
    const gameToCanvasRadius = (radius: number, mapName: string): number => {
        const bounds = mapBounds[mapName] || mapBounds.default
        const mapWidth = bounds.maxX - bounds.minX

        // Ensure the radius is not negative
        const positiveRadius = Math.max(0, radius)

        // Scale the radius proportionally to the canvas width
        return (positiveRadius / mapWidth) * canvasWidth
    }

    // Draw different visualizations based on the selected style
    const drawVisualization = (
        ctx: CanvasRenderingContext2D,
        style: string,
        phases: string[],
        matches: Match[]
    ) => {
        // If no matches or no phases selected, just return (no message display)
        if (matches.length === 0 || phases.length === 0) {
            return
        }

        // Convert phases from strings to numbers
        const phaseNumbers = phases.map(phase => parseInt(phase))

        // Get safe zones for selected phases from all matches
        const safeZones: { x: number, y: number, radius: number, phase: number }[] = []

        matches.forEach(match => {
            if (match.TelemetryData && match.TelemetryData.SafeZones) {
                match.TelemetryData.SafeZones.forEach(zone => {
                    if (phaseNumbers.includes(zone.Phase)) {
                        safeZones.push({
                            x: zone.X,
                            y: zone.Y,
                            radius: zone.Radius,
                            phase: zone.Phase
                        })
                    }
                })
            }
        })

        // Color palette for different phases
        const phaseColors: Record<number, string> = {
            1: "rgba(255, 0, 0, 0.3)",   // Red
            2: "rgba(255, 165, 0, 0.3)", // Orange
            3: "rgba(255, 255, 0, 0.3)", // Yellow
            4: "rgba(0, 255, 0, 0.3)",   // Green
            5: "rgba(0, 255, 255, 0.3)", // Cyan
            6: "rgba(0, 0, 255, 0.3)",   // Blue
            7: "rgba(128, 0, 128, 0.3)", // Purple
            8: "rgba(255, 0, 255, 0.3)"  // Magenta
        }

        // Draw safe zones based on selected style
        safeZones.forEach(zone => {
            // Convert game coordinates to canvas coordinates
            const { canvasX, canvasY } = gameToCanvasCoords(zone.x, zone.y, selectedMap)
            const canvasRadius = gameToCanvasRadius(zone.radius, selectedMap)

            // Use different colors for different phases
            const color = phaseColors[zone.phase] || "rgba(255, 255, 255, 0.3)"

            switch (style) {
                case "dots":
                    // Draw a small dot at the center of each safe zone
                    ctx.fillStyle = color.replace("0.3", "0.7")
                    ctx.beginPath()
                    ctx.arc(canvasX, canvasY, 5, 0, Math.PI * 2)
                    ctx.fill()
                    break

                case "circles":
                    // Draw filled circles for safe zones
                    ctx.fillStyle = color
                    ctx.beginPath()
                    ctx.arc(canvasX, canvasY, canvasRadius, 0, Math.PI * 2)
                    ctx.fill()
                    break

                case "circles-outline":
                    // Draw outline circles for safe zones
                    ctx.strokeStyle = color.replace("0.3", "0.8")
                    ctx.lineWidth = 2
                    ctx.beginPath()
                    ctx.arc(canvasX, canvasY, canvasRadius, 0, Math.PI * 2)
                    ctx.stroke()
                    break

                default:
                    // Default fallback - use circles
                    ctx.fillStyle = color
                    ctx.beginPath()
                    ctx.arc(canvasX, canvasY, canvasRadius, 0, Math.PI * 2)
                    ctx.fill()
            }
        })

        // Optionally, add plane paths visualization here if needed
    }

    return (
        <div className="border rounded-lg shadow-lg overflow-hidden relative max-h-screen">
            <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} className="bg-black" />
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="text-white">Loading map...</div>
                </div>
            )}
        </div>
    )
}