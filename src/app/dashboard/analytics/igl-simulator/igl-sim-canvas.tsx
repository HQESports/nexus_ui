"use client";

import { Match } from "@/app/actions/matches";
import BaseCanvas from "@/components/base-canvas";
import { MIN_ZOOM, MAZ_ZOOM, DEFAULT_CANVAS_SIZE, PUBG_MAP_SCALE, PUBG_MAP_SIZE, zoneRadiusScaled } from "@/lib/constants";
import { SimpleCircle } from "@/lib/models";
import { boundingFunctionCircle, calculateDistance, projectPlanePath } from "@/lib/utils";
import { Vector2d } from "konva/lib/types";
import { useEffect, useState } from "react";
import { Circle, Group, Line, Image, Rect, Layer } from "react-konva";


interface IGLSimWrapperParams {
    match: Match;
    map: string;
    curPhase: number;
    togglePlanePath: boolean
    toggleCanvasCircle: boolean
    toggleDashCircled: boolean
    circles: SimpleCircle[]
    setCircles: (circle: SimpleCircle[]) => void
}



export default function IGLSimCanvas({ match, map, curPhase, togglePlanePath, circles, setCircles, toggleCanvasCircle, toggleDashCircled }: IGLSimWrapperParams) {
    const planePathPoints = projectPlanePath(match.TelemetryData.PlanePath, PUBG_MAP_SIZE, PUBG_MAP_SCALE);
    const trashSize = DEFAULT_CANVAS_SIZE / 24
    const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null);


    const padding = 10
    const trashCirclePos = trashSize / 2

    useEffect(() => {
        const image = new window.Image();
        image.src = "/trash-2.svg"; // Use imported SVG module
        image.onload = () => {
            setBackgroundImage(image);
        };
        image.onerror = (error) => {
            console.error("Error loading image:", error);
        };
    }, [circles]);
    return (
        <div className="relative">
            <BaseCanvas
                mapName={map}
                minZoom={MIN_ZOOM}
                maxZoom={MAZ_ZOOM}
                canvasSize={DEFAULT_CANVAS_SIZE}
            >
                <Group>
                    {toggleCanvasCircle && match.TelemetryData.SafeZones.filter((zone) => zone.Phase <= curPhase).map((telemetry, index) => {
                        return (

                            <Circle
                                key={index}
                                x={telemetry.X * PUBG_MAP_SCALE}
                                y={telemetry.Y * PUBG_MAP_SCALE}
                                radius={telemetry.Radius * PUBG_MAP_SCALE}
                                fill="transparent"
                                stroke={curPhase === telemetry.Phase ? "yellow" : "white"}
                                strokeWidth={2}

                            />
                        )
                    }
                    )}
                    {
                        togglePlanePath &&
                        <>
                            <Line
                                points={planePathPoints}
                                stroke="white"
                                strokeWidth={6}
                                lineCap="round"
                            />
                            <Line
                                points={planePathPoints}
                                stroke="red"
                                strokeWidth={6}
                                lineCap="round"
                                dash={[20, 20]}
                            />
                        </>
                    }
                    {
                        toggleDashCircled && circles.map((circle, index) => {
                            return (
                                <Circle
                                    key={index}
                                    x={circle.x}
                                    y={circle.y}
                                    radius={circle.radius}
                                    stroke={circle.trash ? "red" : "orange"}
                                    strokeWidth={4 / circle.phase}
                                    onDragMove={(pos) => {
                                        const newCircles = [...circles];
                                        newCircles[index] = {
                                            ...newCircles[index],
                                            x: pos.target.x(),
                                            y: pos.target.y()
                                        };

                                        const x = newCircles[index].x
                                        const y = newCircles[index].y
                                        const radius = newCircles[index].radius
                                        const collided = calculateDistance(x, y, trashCirclePos, trashCirclePos) < radius + trashSize
                                        newCircles[index].trash = collided

                                        setCircles(newCircles);
                                    }}
                                    onDragEnd={(pos) => {
                                        const newCircles = [...circles];
                                        newCircles[index] = {
                                            ...newCircles[index],
                                            x: pos.target.x(),
                                            y: pos.target.y()
                                        };

                                        const x = newCircles[index].x
                                        const y = newCircles[index].y
                                        const radius = newCircles[index].radius
                                        const collided = calculateDistance(x, y, trashCirclePos, trashCirclePos) < radius + trashSize
                                        if (collided) {
                                            newCircles.splice(index, 1);
                                        }

                                        setCircles(newCircles);
                                    }}

                                    draggable
                                    dragBoundFunc={(pos: Vector2d) => {
                                        const newPos = boundingFunctionCircle(pos, circle.radius / 4, DEFAULT_CANVAS_SIZE)
                                        return newPos
                                    }} />
                            )
                        })
                    }
                    <Group x={padding} y={padding} >
                        <Circle x={trashCirclePos} y={trashCirclePos} radius={trashSize / 2 + padding / 2} opacity={0.6} fill={"white"} />
                        {
                            backgroundImage &&
                            <Image
                                image={backgroundImage}
                                x={0}
                                y={0}
                                bgColor="white"
                                width={trashSize}
                                height={trashSize}
                            />

                        }
                    </Group>
                </Group>
            </BaseCanvas>
        </div>
    )
}