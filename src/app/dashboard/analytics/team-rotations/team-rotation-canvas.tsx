"use client"

import { TeamRotation } from "@/app/actions/teams"
import { useEffect, useRef, useState } from "react"
import { MAP_IMAGES } from "./constants"
import { Match } from "@/app/actions/matches"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import { Card } from "@/components/ui/card"

interface TeamRotationCanvasProps {
    rotation: TeamRotation
    styleOptions: string[]
}

export default function TeamRotationsCanvas({ rotation, styleOptions }: TeamRotationCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const canvasWidth = 700
    const canvasHeight = 700
    console.log("Rendering TeamRotationsCanvas with rotation:", rotation)

    // Maximum coordinate in the game space (0-816000)
    const MAX_GAME_COORDINATE = 816000

    // Generate colors with proper opacity
    const getPlayerColor = (index: number): string => {
        const colors = [
            "rgba(255, 87, 51, 0.7)",  // Red-Orange
            "rgba(51, 255, 87, 0.7)",  // Green
            "rgba(51, 87, 255, 0.7)",  // Blue
            "rgba(240, 51, 255, 0.7)", // Purple
            "rgba(255, 51, 168, 0.7)", // Pink
            "rgba(51, 255, 246, 0.7)", // Cyan
            "rgba(255, 252, 51, 0.7)", // Yellow
            "rgba(255, 131, 51, 0.7)"  // Orange
        ]
        return colors[index % colors.length]
    }

    // Get solid colors for the legend
    const getSolidColor = (index: number): string => {
        const colors = [
            "#FF5733", // Red-Orange
            "#33FF57", // Green
            "#3357FF", // Blue
            "#F033FF", // Purple
            "#FF33A8", // Pink
            "#33FFF6", // Cyan
            "#FFFC33", // Yellow
            "#FF8333"  // Orange
        ]
        return colors[index % colors.length]
    }

    // Convert game coordinates (0-816000) to canvas coordinates
    const gameToCanvasCoords = (x: number, y: number): [number, number] => {
        return [
            (x / MAX_GAME_COORDINATE) * canvasWidth,
            (y / MAX_GAME_COORDINATE) * canvasHeight
        ]
    }

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Set canvas dimensions
        canvas.width = canvasWidth
        canvas.height = canvasHeight

        setIsLoading(true)

        // Create an image object
        const img = new Image()
        img.crossOrigin = "anonymous" // Prevent CORS issues
        img.src = MAP_IMAGES[rotation?.match.MapName]

        // Draw the image when it loads
        img.onload = () => {
            // Draw the image as background
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

            // Draw player rotations
            if (rotation && rotation.player_rotations) {
                rotation.player_rotations.forEach((player, playerIndex) => {
                    if (player.rotation.length < 2) return // Need at least 2 points to draw a line

                    const color = getPlayerColor(playerIndex)

                    // Draw the player's path with lines
                    ctx.beginPath()

                    // Start from the first position
                    const [startX, startY] = gameToCanvasCoords(
                        player.rotation[0].x,
                        player.rotation[0].y
                    )
                    ctx.moveTo(startX, startY)

                    // Draw a line to each subsequent position
                    for (let i = 1; i < player.rotation.length; i++) {
                        const [x, y] = gameToCanvasCoords(
                            player.rotation[i].x,
                            player.rotation[i].y
                        )
                        ctx.lineTo(x, y)
                    }

                    // Style the line - thicker and with opacity
                    ctx.strokeStyle = color
                    ctx.lineWidth = 2 // Thicker line for better visibility
                    ctx.stroke()

                })

                drawSafeZones(ctx, rotation.match, styleOptions)
            }

            setIsLoading(false)
        }
    }, [rotation, styleOptions])

    // Function to draw safe zone circles from match telemetry data
    const drawSafeZones = (
        ctx: CanvasRenderingContext2D,
        match: Match | undefined,
        options: string[] = []
    ) => {
        if (!match || !match.TelemetryData || !match.TelemetryData.SafeZones || match.TelemetryData.SafeZones.length === 0) {
            return; // No match data or no safe zones to draw
        }

        // Get safe zones from telemetry
        const safeZones = match.TelemetryData.SafeZones;

        // Draw each safe zone with a different appearance based on phase
        safeZones.forEach((zone, index) => {
            if (options.includes("circle") == false) return
            const [x, y] = gameToCanvasCoords(zone.X, zone.Y);
            const radius = (zone.Radius / MAX_GAME_COORDINATE) * canvasWidth;

            // Calculate opacity based on phase (earlier phases are more transparent)
            const baseOpacity = 0.05; // Low base opacity to not overwhelm the visualization
            const opacity = baseOpacity + ((index / safeZones.length) * 0.05); // Gradually increase opacity

            // Choose color based on phase
            let color;
            if (index === 0) {
                // First zone (white)
                color = `rgba(255, 255, 255, ${opacity})`;
            } else if (index === safeZones.length - 1) {
                // Final zone (red)
                color = `rgba(255, 0, 0, ${opacity + 0.1})`; // Slightly more opaque
            } else {
                // Intermediate zones (blue tones that get darker)
                const blueValue = Math.max(80, 255 - (index * 30));
                color = `rgba(100, 150, ${blueValue}, ${opacity})`;
            }

            // Draw circle fill
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();

            // Draw circle border
            ctx.strokeStyle = color.replace(/[\d\.]+\)$/g, "1)"); // Solid version of the fill color
            ctx.lineWidth = 2;
            ctx.stroke();
        });

        // Draw plane path if available
        if (match.TelemetryData.PlanePath && options.includes("plane")) {
            const path = match.TelemetryData.PlanePath;
            const [startX, startY] = gameToCanvasCoords(path.StartX, path.StartY);
            const [endX, endY] = gameToCanvasCoords(path.EndX, path.EndY);

            // Draw plane path line
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
            ctx.lineWidth = 3;
            ctx.setLineDash([10, 5]); // Dashed line for plane path
            ctx.stroke();
            ctx.setLineDash([]); // Reset line dash

            // Draw plane icon at start of path
            ctx.font = "16px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("✈️", startX, startY);
        }
    };

    return (
        <div className="relative py-6 flex justify-center">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 z-10">
                    <div className="text-white font-bold p-2 rounded">Loading map...</div>
                </div>
            )}
            <canvas
                className="border rounded-lg shadow-lg"
                ref={canvasRef}
                width={canvasWidth}
                height={canvasHeight}
            />
            {/* Legend Overlay */}
            {styleOptions.includes("legend") && <div className="absolute top-4 left-4 bg-accent bg-opacity-90 p-4 rounded-lg shadow-lg z-20 border border-white">
                <h3 className="text-lg font-bold mb-2">Player Rotations</h3>
                <ul className="space-y-2">
                    {rotation?.player_rotations?.map((player, index) => (
                        <li key={index} className="flex items-center space-x-2">
                            <span
                                className="w-4 h-4 rounded"
                                style={{ backgroundColor: getSolidColor(index) }}
                            ></span>
                            <span className="text-sm text-white">{player.name}</span>
                        </li>
                    ))}
                </ul>
            </div>}
        </div>
    )
}