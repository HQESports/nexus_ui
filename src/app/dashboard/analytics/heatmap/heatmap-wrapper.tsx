"use client"

import { FilteredMatchesParams, FilteredMatchesResponse } from "@/app/actions/matches"
import MatchFilter from "@/components/filters/match-filter"
import { GradientPreview } from "@/components/GradientPreview"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import ModeToggle from "@/components/ui/mode-togle"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarProvider } from "@/components/ui/sidebar"
import { Slider } from "@/components/ui/slider"
import { THERMAL_GRADIENTS } from "@/lib/color-schemes"
import { AnalyzeModes, convertUnitsToMeters, DEFAULT_ANALYZE_MODE, DEFAULT_ANALYZE_MODE_CIRCLE, DEFAULT_CLUSTER_RADIUS, DEFAULT_PHASES, DEFAULT_STYLE, PHASE_OPTIONS, PUBG_MAP_SCALE, STYLE_OPTIONS, zoneRadius, ZONES } from "@/lib/constants"
import { ChevronsUpDown, Circle } from "lucide-react"
import dynamic from "next/dynamic"
import { useState } from "react"

const HeatmapCanvas = dynamic(() => import('./heatmap-canvas'), { ssr: false })

interface HeatmapWrapperProps {
    matchesResponse: FilteredMatchesResponse
    filterParams: FilteredMatchesParams
    map: string
}

export default function HeatmapWrapper({ filterParams, matchesResponse, map }: HeatmapWrapperProps) {
    let phaseCount = new Map<number, number>()
    for (const phase of PHASE_OPTIONS) {
        phaseCount.set(phase.id, 0)
    }
    for (const match of matchesResponse.matches) {
        if (!match.TelemetryData.SafeZones) {
            continue
        }
        for (const zone of match.TelemetryData.SafeZones) {
            if (phaseCount.has(zone.Phase)) {
                phaseCount.set(zone.Phase, phaseCount.get(zone.Phase)! + 1)
            }
        }
    }

    const [selectedPhases, setSelectedPhases] = useState<number[]>(DEFAULT_PHASES)
    const [selectedStyle, setSelectedStyle] = useState<string>(DEFAULT_STYLE)
    const [selectedGradient, setSelectedGradient] = useState<Record<number, string>>(THERMAL_GRADIENTS["DEFAULT"])
    const [mode, setMode] = useState<AnalyzeModes>(DEFAULT_ANALYZE_MODE)
    const [modeCircle, setModeCircle] = useState<string>(DEFAULT_ANALYZE_MODE_CIRCLE)
    const [clusterRadius, setClusterRadius] = useState<number>(DEFAULT_CLUSTER_RADIUS)

    const handlePhaseChange = (phaseId: number, checked: boolean) => {
        if (checked) {
            setSelectedPhases([...selectedPhases, phaseId])
        } else {
            setSelectedPhases(selectedPhases.filter((phase) => phase !== phaseId))
        }
    }

    const handleGradientChange = (value: string) => {
        const gradient = THERMAL_GRADIENTS[value]
        setSelectedGradient(gradient)
    }

    const onModeChange = (mode: AnalyzeModes) => {
        setMode(mode)
    }

    const onCircleModeSelect = (modeCircle: string) => {
        setModeCircle(modeCircle)
    }

    return (
        <SidebarProvider>
            <div className="flex w-full h-[calc(100vh-64px)] overflow-hidden">
                <div className="flex-1 flex items-center justify-center">
                    <div className="min-w-[600px] flex items-center justify-center">
                        <HeatmapCanvas clusterRadius={clusterRadius} modeCircle={modeCircle} mode={mode} map={map} matches={matchesResponse} selectedPhases={selectedPhases} selectedStyle={selectedStyle} gradient={selectedGradient} />
                    </div>
                </div>
                <Sidebar side="right" className="border-l">
                    <SidebarHeader className="border-b">
                        <div className="flex flex-col items-center justify-between">
                            <h1 className="text-2xl font-bold">Heatmap Controls</h1>
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <MatchFilter filterParams={filterParams} count={matchesResponse.count} />
                        <SidebarGroup className="space-y-2 border-b-2">

                            {/* Phase selectors */}
                            <div className="text-lg w-full text-center text-primary font-bold">Phase Controls</div>
                            <Label>Phase Selector</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" role="combobox" className="w-full justify-between">
                                        {selectedPhases.length === 0
                                            ? "Select phases"
                                            : `${selectedPhases.length} phase${selectedPhases.length !== 1 ? "s" : ""} selected`}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-2" align="start">
                                    <div className="space-y-2">
                                        {PHASE_OPTIONS.map((option) => (
                                            <div key={option.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`phase-${option.id}`}
                                                    checked={selectedPhases.includes(option.id)}
                                                    onCheckedChange={(checked) => handlePhaseChange(option.id, checked as boolean)}
                                                />
                                                <Label htmlFor={`phase-${option.id}`} className="cursor-pointer text-sm font-normal flex-1">
                                                    {option.label} <Badge className="bg-blue-500 text-white border-blue-700">{phaseCount.get(option.id)}</Badge>
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <div className="w-full grid grid-cols-4 gap-2">
                                {selectedPhases.map((phase) => (
                                    <Badge key={`${phase}`}> <Circle className="w-4 h-4" />{phase}</Badge>
                                ))}
                            </div>

                            {/* Display style */}
                            <Label>Heatmap Style</Label>
                            <Select onValueChange={setSelectedStyle} value={selectedStyle}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select style" className="w-full" />
                                </SelectTrigger>
                                <SelectContent>
                                    {STYLE_OPTIONS.map((style) => (
                                        <SelectItem key={style.id} value={style.id}>
                                            {style.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {/* Gradient select */}
                            <Label>Gradient</Label>
                            <Select onValueChange={handleGradientChange} defaultValue={"DEFAULT"} >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a gradient" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Thermal Gradients</SelectLabel>
                                        {Object.entries(THERMAL_GRADIENTS).map(([id, val]) => (
                                            <SelectItem key={id} value={id}>
                                                <div className="flex items-center space-x-2">
                                                    <GradientPreview gradientData={val} />

                                                </div>
                                            </SelectItem>
                                        ))}

                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </SidebarGroup>
                        {/* Analysis Modes */}
                        <SidebarGroup className="space-y-2">
                            <div className="text-lg w-full text-center text-primary font-bold">Analysis Controls</div>
                            <Label>Mode</Label>
                            <ModeToggle onModeChange={onModeChange} />
                            <Label>Circle Size</Label>
                            <Select onValueChange={onCircleModeSelect} value={modeCircle}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select an analysis circle size" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {ZONES.map((zone) => (
                                            <SelectItem key={zone} value={zone}>
                                                Phase {zone}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {mode === AnalyzeModes.Cluster &&
                                <div className="space-y-2">
                                    <Label>Cluster Radius {convertUnitsToMeters(clusterRadius / PUBG_MAP_SCALE)}m</Label>
                                    <Slider
                                        value={[clusterRadius]}
                                        onValueChange={(value) => setClusterRadius(value[0])}
                                        min={1}
                                        max={100}
                                        step={1}
                                    />
                                </div>
                            }
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
            </div>
        </SidebarProvider >
    )
}