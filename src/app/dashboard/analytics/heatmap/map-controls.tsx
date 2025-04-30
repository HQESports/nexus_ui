"use client"

import { Bold, CalendarIcon, ChevronsUpDown, Italic, Underline } from "lucide-react"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { MAP_OPTIONS, MATCH_TYPE_OPTIONS, PHASE_OPTIONS, STYLE_OPTIONS } from "./constants"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import ReducerIcon from "@/components/ui/reducer-icon"
import ModeToggle from "./analysis-mode-toggle"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@radix-ui/react-separator"

interface MapControlsProps {
    selectedMap: string
    setSelectedMap: (map: string) => void
    dateRange: DateRange | undefined
    setDateRange: (dateRange: DateRange | undefined) => void
    matchTypes: string[]
    setMatchTypes: (types: string[]) => void
    selectedStyle: string
    setSelectedStyle: (style: string) => void
    selectedPhases: string[]
    setSelectedPhases: (phases: string[]) => void
}

export function MapControls({
    selectedMap,
    setSelectedMap,
    dateRange,
    setDateRange,
    matchTypes,
    setMatchTypes,
    selectedStyle,
    setSelectedStyle,
    selectedPhases,
    setSelectedPhases,
}: MapControlsProps) {
    // Handle checkbox changes for match types
    const handleMatchTypeChange = (typeId: string, checked: boolean) => {
        if (checked) {
            setMatchTypes([...matchTypes, typeId])
        } else {
            setMatchTypes(matchTypes.filter((type) => type !== typeId))
        }
    }

    // Handle checkbox changes for phases
    const handlePhaseChange = (phaseId: string, checked: boolean) => {
        if (checked) {
            setSelectedPhases([...selectedPhases, phaseId])
        } else {
            setSelectedPhases(selectedPhases.filter((phase) => phase !== phaseId))
        }
    }

    // Format date range to prevent overflow
    const formatDateRange = () => {
        if (!dateRange?.from) return <span>Select dates</span>

        if (dateRange.to) {
            // Use shorter month format and just show month/day
            return (
                <span className="text-xs">
                    {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d, yyyy")}
                </span>
            )
        }

        return <span className="text-xs">{format(dateRange.from, "MMM d, yyyy")}</span>
    }

    return (
        <div className="space-y-6">
            {/* Map Selection */}
            <div className="space-y-2">
                <Label htmlFor="map-select">Map</Label>
                <Select value={selectedMap} onValueChange={setSelectedMap}>
                    <SelectTrigger id="map-select">
                        <SelectValue placeholder="Select map" />
                    </SelectTrigger>
                    <SelectContent>
                        {MAP_OPTIONS.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Date Range Picker */}
            <div className="space-y-2">
                <Label>Date Range</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={cn("w-full justify-start text-left font-normal", !dateRange && "text-muted-foreground")}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                            <div className="truncate">{formatDateRange()}</div>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={dateRange?.from}
                            selected={dateRange}
                            onSelect={setDateRange}
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            {/* Match Type - Multi-select with popover */}
            <div className="space-y-2">
                <Label>Match Types</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" role="combobox" className="w-full justify-between">
                            {matchTypes.length === 0
                                ? "Select match types"
                                : `${matchTypes.length} type${matchTypes.length !== 1 ? "s" : ""} selected`}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-2" align="start">
                        <div className="space-y-2">
                            {MATCH_TYPE_OPTIONS.map((option) => (
                                <div key={option.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`match-type-${option.id}`}
                                        checked={matchTypes.includes(option.id)}
                                        onCheckedChange={(checked) => handleMatchTypeChange(option.id, checked as boolean)}
                                    />
                                    <Label htmlFor={`match-type-${option.id}`} className="cursor-pointer text-sm font-normal flex-1">
                                        {option.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            {/* Phase Selector - Multi-select with popover */}
            <div className="space-y-2">
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
                                        {option.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            {/* Style Selection - Single select */}
            <div className="space-y-2">
                <Label htmlFor="style-select">Style</Label>
                <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                    <SelectTrigger id="style-select">
                        <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                        {STYLE_OPTIONS.map((style) => (
                            <SelectItem key={style.id} value={style.id}>
                                {style.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {/* Analysis controls */}
                <div className="space-y-2 flex flex-col items-center">
                    <Label>Analysis Mode</Label>
                    <ModeToggle size="sm" />
                    <ToggleGroup type="multiple">
                        <ToggleGroupItem value="bold" aria-label="Toggle bold">
                            <Bold className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="italic" aria-label="Toggle italic">
                            <Italic className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
                            <Underline className="h-4 w-4" />
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
            </div>
        </div>

    )
}
