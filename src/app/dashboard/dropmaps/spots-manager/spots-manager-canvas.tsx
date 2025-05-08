"use client"

import BaseCanvas from "@/components/base-canvas"
import { DEFAULT_CANVAS_SIZE, MAX_ZOOM, MIN_ZOOM, PUBG_MAP_SCALE, SPOT_FONT_SIZE, SPOT_PADDING, SPOT_RADIUS } from "@/lib/constants"
import { DropspotLocation } from "@/lib/models"
import { boundingFunctionCircle } from "@/lib/utils"
import { Vector2d } from "konva/lib/types"
import { useState } from "react"
import { Circle, Group, Text, Rect } from "react-konva"

interface SpotsManagerCanvasProps {
    map: string
    dropspotLocations: DropspotLocation[]
    handlePosChange: (index: number, x: number, y: number) => void
    handleDropspotSelect: (index: number) => void
}

export default function SpotsManagerCanvas({ map, dropspotLocations, handlePosChange, handleDropspotSelect }: SpotsManagerCanvasProps) {
    const [isHovered, setIsHovered] = useState<boolean[]>(dropspotLocations.map(() => true))

    return (
        <BaseCanvas mapName={map} minZoom={MIN_ZOOM} maxZoom={MAX_ZOOM} canvasSize={DEFAULT_CANVAS_SIZE}>
            <Group>
                {dropspotLocations.map((dropspot, index) =>
                (
                    <Group key={index}>
                        <Circle
                            x={dropspot.x * PUBG_MAP_SCALE}
                            y={dropspot.y * PUBG_MAP_SCALE}
                            radius={SPOT_RADIUS}
                            strokeWidth={1}
                            fill="goldenrod"
                            stroke="white"
                            onDragMove={(pos) => {
                                handlePosChange(index, pos.target.x(), pos.target.y())
                            }}
                            onClick={() => handleDropspotSelect(index)}
                            draggable
                            dragBoundFunc={(pos: Vector2d) => {
                                const newPos = boundingFunctionCircle(pos, SPOT_RADIUS, DEFAULT_CANVAS_SIZE)
                                return newPos
                            }}
                        />
                        <Text
                            x={dropspot.x * PUBG_MAP_SCALE}
                            y={dropspot.y * PUBG_MAP_SCALE}
                            text={"HELOOO"}
                            fontSize={16}
                            fill={"red"}
                        />

                    </Group>
                ))
                }
            </Group>
        </BaseCanvas>
    )
}