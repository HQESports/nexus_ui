"use client";
import { Circle, Group } from "react-konva";
import { FilteredMatchesResponse } from "@/app/actions/matches";
import { AnalyzeModes, DEFAULT_ANALYZE_MODE, DEFAULT_CANVAS_SIZE, PHASE_COLORS, PUBG_MAP_SCALE, zoneRadiusScaled } from "@/lib/constants";
import BaseCanvas from "@/components/base-canvas";
import { Vector2d } from "konva/lib/types";
import { useState } from "react";
import { calculateDistance } from "@/lib/utils";

interface HeatmapCanvasProps {
    matches: FilteredMatchesResponse
    selectedPhases: number[]
    selectedStyle: string
    gradient: Record<number, string>
    map: string
    mode: AnalyzeModes
    modeCircle: string
    clusterRadius: number
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
        />
    )
}


export default function HeatmapCanvas({ clusterRadius, modeCircle, mode, matches, selectedPhases, selectedStyle, gradient, map }: HeatmapCanvasProps) {

    const [circlePos, setCirclePos] = useState({ x: DEFAULT_CANVAS_SIZE / 2, y: DEFAULT_CANVAS_SIZE / 2 })

    const filteredMatches = matches.matches.filter((match) => {
        if (!match.TelemetryData.SafeZones) {
            return false
        }

        if (mode === AnalyzeModes.Cluster) {
            const matchZone = match.TelemetryData.SafeZones.find((zone) => {
                return `${zone.Phase}` == modeCircle
            })

            if (!matchZone) {
                return false
            }

            const dist = calculateDistance(circlePos.x, circlePos.y, matchZone.X * PUBG_MAP_SCALE, matchZone.Y * PUBG_MAP_SCALE)

            return dist <= clusterRadius
        }

        return true
    })

    const modeRadius = zoneRadiusScaled[modeCircle]
    return (
        <BaseCanvas mapName={map} minZoom={1} maxZoom={25} canvasSize={DEFAULT_CANVAS_SIZE}  >

            <Group>
                {filteredMatches.map((match, index) => {
                    if (!match.TelemetryData.SafeZones) {
                        return null
                    }
                    return match.TelemetryData.SafeZones
                        .filter((zone) => {
                            if (mode === AnalyzeModes.Reducer) {
                                const x = zone.X * PUBG_MAP_SCALE
                                const y = zone.Y * PUBG_MAP_SCALE
                                let radius = zone.Radius * PUBG_MAP_SCALE
                                const dist = calculateDistance(circlePos.x, circlePos.y, x, y)

                                return dist + radius <= modeRadius
                            }
                            return true
                        })
                        .map((zone, zoneIndex) => {
                            if (selectedPhases.includes(zone.Phase)) {
                                const x = zone.X * PUBG_MAP_SCALE
                                const y = zone.Y * PUBG_MAP_SCALE
                                let radius = zone.Radius * PUBG_MAP_SCALE
                                const opacity = 0.5
                                var fillColor = `rgba(${gradient[zone.Phase]})`
                                var strokeColor = ""

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
            </Group>
            <Group>
                <Group>
                    {mode != AnalyzeModes.None && <Circle
                        x={circlePos.x}
                        y={circlePos.y}
                        radius={modeRadius}
                        fill="transparent"
                        stroke="#FF0000"
                        strokeWidth={4}
                        dash={[10, 5]}
                        onDragMove={(pos) => { }}
                        draggable
                        dragBoundFunc={(pos: Vector2d) => {
                            const minX = modeRadius;
                            const maxX = DEFAULT_CANVAS_SIZE - modeRadius;
                            const minY = modeRadius;
                            const maxY = DEFAULT_CANVAS_SIZE - modeRadius;

                            const x = Math.max(minX, Math.min(maxX, pos.x))
                            const y = Math.max(minY, Math.min(maxY, pos.y))

                            const newPos = {
                                x: x,
                                y: y,
                            }

                            setCirclePos(newPos)

                            return newPos
                        }}
                    />}
                </Group>
            </Group>

        </BaseCanvas>
    )
}