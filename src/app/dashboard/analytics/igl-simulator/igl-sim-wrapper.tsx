"use client";

import { FilteredMatchesParams, FilteredMatchResponse, Match } from "@/app/actions/matches";
import MatchFilter from "@/components/filters/match-filter";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarProvider } from "@/components/ui/sidebar";
import { DEFAULT_CANVAS_SIZE, zoneRadiusScaled, ZONES } from "@/lib/constants";
import { SimpleCircle } from "@/lib/models";
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, PlaneIcon, Trash2, Circle, CircleDashed } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const IGLSimCanvas = dynamic(() => import('./igl-sim-canvas'), { ssr: false })

interface IGLSimWrapperParams {
    match: Match
    filterParams: FilteredMatchesParams
    map: string
}

export default function IGLSimWrapper({ filterParams, match, map }: IGLSimWrapperParams) {
    const [curPhase, setCurPhase] = useState(match.TelemetryData.SafeZones[0].Phase);
    const [togglePlanePath, setTogglePlanePath] = useState(true);
    const [toggleCanvasCircle, setToggleCanvasCircle] = useState(true);
    const [toggleDashCircled, setToggleDashCircled] = useState(true);
    const [circles, setCircles] = useState<SimpleCircle[]>([]);

    const step = (direction: "start" | "backward" | "forward" | "end") => {
        switch (direction) {
            case "start":
                setCurPhase(match.TelemetryData.SafeZones[0].Phase);
                break;
            case "backward":
                if (curPhase > match.TelemetryData.SafeZones[0].Phase) {
                    setCurPhase(curPhase - 1);
                }
                break;
            case "forward":
                if (curPhase < match.TelemetryData.SafeZones.length) {
                    setCurPhase(curPhase + 1);
                }
                break;
            case "end":
                setCurPhase(match.TelemetryData.SafeZones.length);
                break;
            default:

        }
    }

    useEffect(() => {
        setCurPhase(match.TelemetryData.SafeZones[0].Phase);
    }, [match]);

    return (
        <SidebarProvider>
            <div className="flex w-full h-[calc(100vh-64px)] overflow-hidden">
                <div className="flex-1 flex items-center justify-center">
                    <div className="min-w-[600px] flex items-center justify-center">
                        <IGLSimCanvas
                            match={match}
                            map={map}
                            curPhase={curPhase}
                            togglePlanePath={togglePlanePath}
                            toggleCanvasCircle={toggleCanvasCircle}
                            toggleDashCircled={toggleDashCircled}
                            circles={circles}
                            setCircles={setCircles} />
                    </div>
                </div>
                <Sidebar side="right" className="border-l">
                    <SidebarHeader className="border-b">
                        <div className="flex flex-col items-center justify-between">
                            <h1 className="text-2xl font-bold">IGL Simulator</h1>
                        </div>
                    </SidebarHeader>
                    <SidebarContent className="space-y-2">
                        <MatchFilter filterParams={filterParams} count={undefined} useLimit={false} buttonStr={"New Match"} />
                        <SidebarGroup className="space-y-2 items-center justify-center">
                            <div className="flex flex-col items-center justify-between">
                                <h1 className="text-2xl font-bold">Sim Controls</h1>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => step("start")}
                                    disabled={curPhase === match.TelemetryData.SafeZones[0].Phase}
                                    aria-label="Go to start"
                                >
                                    <ChevronsLeft className="h-4 w-4" />
                                </Button>

                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => step("backward")}
                                    disabled={curPhase === match.TelemetryData.SafeZones[0].Phase}
                                    aria-label="Go back one step"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>

                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => step("forward")}
                                    disabled={curPhase === match.TelemetryData.SafeZones.length}
                                    aria-label="Go forward one step"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>

                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => step("end")}
                                    disabled={curPhase === match.TelemetryData.SafeZones.length}
                                    aria-label="Go to end"
                                >
                                    <ChevronsRight className="h-4 w-4" />
                                </Button>
                            </div>
                            <Label>Phase {curPhase} / {match.TelemetryData.SafeZones.length}</Label>


                        </SidebarGroup>
                        <SidebarGroup className="space-y-2 items-center justify-center">
                            <div className="flex items-center gap-2">
                                <Button
                                    variant={togglePlanePath ? "default" : "outline"}
                                    onClick={() => setTogglePlanePath(!togglePlanePath)}
                                    size="icon"
                                    aria-label="Toggle Plane Path"
                                >
                                    <PlaneIcon className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant={togglePlanePath ? "default" : "outline"}
                                    onClick={() => setToggleCanvasCircle(!toggleCanvasCircle)}
                                    size="icon"
                                    aria-label="Toggle Plane Path"
                                >
                                    <Circle className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant={togglePlanePath ? "default" : "outline"}
                                    onClick={() => setToggleDashCircled(!toggleDashCircled)}
                                    size="icon"
                                    aria-label="Toggle Plane Path"
                                >
                                    <CircleDashed className="h-4 w-4" />
                                </Button>
                            </div>
                        </SidebarGroup>
                        <SidebarGroup className="space-y-2">
                            <Label>Add Circles</Label>
                            <div className="w-full grid grid-cols-2 justify-center items-center gap-2">
                                {ZONES.map((zone, index) => (
                                    <Button
                                        size={"icon"}
                                        variant={"outline"}
                                        className="w-full"
                                        key={index}
                                        onClick={() => {
                                            const newCircle: SimpleCircle = {
                                                x: DEFAULT_CANVAS_SIZE / 2,
                                                y: DEFAULT_CANVAS_SIZE / 2,
                                                radius: zoneRadiusScaled[zone],
                                                trash: false,
                                                phase: index + 1,
                                            };
                                            setCircles([...circles, newCircle]);
                                        }}
                                    >
                                        <Circle className="h-4 w-4" />
                                        Phase {zone}
                                    </Button>

                                ))}
                            </div>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
            </div>
        </SidebarProvider >
    )
}