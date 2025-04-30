import { Circle } from "react-konva";
import BaseCanvas from "../../scratch/base-canvas";
import { FilteredMatchesResponse } from "@/app/actions/matches";
import { DEFAULT_CANVAS_SIZE, PHASE_COLORS, PUBG_MAP_SCALE } from "@/lib/constants";

interface HeatmapCanvasProps {
    filterMatches: FilteredMatchesResponse
    selectedPhases: number[]
    selectedStyle: string
    gradient: Record<number, string>
    map: string
}

function genCircle(key: number, x: number, y: number, radius: number, opacity: number, zIndex: number, index: number, zoneIndex: number, color: string) {
    return (
        <Circle
            key={`${index}-${zoneIndex}`}
            x={x}
            y={y}
            radius={radius}
            fill={color}
            opacity={opacity}
            zIndex={zIndex}
        />
    )
}

function genDot(key: number, x: number, y: number, radius: number, opacity: number, zIndex: number, index: number, zoneIndex: number, color: string) {
    return (
        <Circle
            key={`${index}-${zoneIndex}`}
            x={x}
            y={y}
            radius={2}
            fill={color}
            zIndex={zIndex}
        />
    )
}

function genOutline(key: number, x: number, y: number, radius: number, opacity: number, zIndex: number, index: number, zoneIndex: number, color: string) {
    return (
        <Circle
            key={`${index}-${zoneIndex}`}
            x={x}
            y={y}
            radius={radius}
            strokeWidth={4}
            stroke={color}
            fill="transparent"
            opacity={opacity}
            zIndex={zIndex}
        />
    )
}


export default function HeatmapCanvas({ filterMatches, selectedPhases, selectedStyle, gradient, map }: HeatmapCanvasProps) {
    return (
        <BaseCanvas mapName={map} minZoom={1} maxZoom={25} canvasSize={DEFAULT_CANVAS_SIZE}  >
            {filterMatches.matches.map((match, index) => {
                if (!match.TelemetryData.SafeZones) {
                    return null
                }
                return match.TelemetryData.SafeZones.map((zone, zoneIndex) => {
                    if (selectedPhases.includes(zone.Phase)) {
                        const x = zone.X * PUBG_MAP_SCALE
                        const y = zone.Y * PUBG_MAP_SCALE
                        let radius = zone.Radius * PUBG_MAP_SCALE
                        const opacity = 0.5
                        var fillColor = `rgba(${gradient[zone.Phase]})`
                        var strokeColor = ""
                        var strokeWidth = 2

                        if (selectedStyle === "circles") {
                            return genCircle(index, x, y, radius, opacity, zoneIndex, index, zoneIndex, fillColor)
                        } else if (selectedStyle === "dots") {
                            return genDot(index, x, y, radius, opacity, zoneIndex, index, zoneIndex, fillColor)
                        } else if (selectedStyle === "circles-outline") {
                            return genOutline(index, x, y, radius, opacity, zoneIndex, index, zoneIndex, strokeColor)
                        }
                    }
                })
            })}
        </BaseCanvas>
    )
}