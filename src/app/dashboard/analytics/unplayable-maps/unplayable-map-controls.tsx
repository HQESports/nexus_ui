// components/UnplayableMapControls.tsx
"use client"

import type React from "react"

import { Suspense, useCallback, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { format } from "date-fns"
import { CalendarIcon, RefreshCw } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { MAP_OPTIONS, PARAM_NAMES } from "./constants"
import { useNavigationLoading } from "@/components/NavigationLoadingProvider"

interface UnplayableMapControlsProps {
    initialMap: string
    initialDateRange: DateRange
    initialThreshold: number
    initialOverlayColor: string
    initialOverlayOpacity: number
}

export function UnplayableMapControls({
    initialMap,
    initialDateRange,
    initialThreshold,
    initialOverlayColor,
    initialOverlayOpacity,
}: UnplayableMapControlsProps) {
    // Local state that starts with the initial values from URL
    const [selectedMap, setSelectedMap] = useState<string>(initialMap)
    const [dateRange, setDateRange] = useState<DateRange>(initialDateRange)
    const [threshold, setThreshold] = useState<number>(initialThreshold)
    const [overlayColor, setOverlayColor] = useState<string>(initialOverlayColor)
    const [overlayOpacity, setOverlayOpacity] = useState<number>(initialOverlayOpacity)
    const [isDirty, setIsDirty] = useState<boolean>(false)

    const router = useRouter()
    const searchParams = useSearchParams()
    const { isNavigating, setIsNavigating } = useNavigationLoading()

    // Mark form as dirty when any value changes
    useEffect(() => {
        if (
            selectedMap !== initialMap ||
            dateRange?.from !== initialDateRange?.from ||
            dateRange?.to !== initialDateRange?.to ||
            threshold !== initialThreshold ||
            overlayColor !== initialOverlayColor ||
            overlayOpacity !== initialOverlayOpacity
        ) {
            setIsDirty(true)
        } else {
            setIsDirty(false)
        }
    }, [
        selectedMap,
        dateRange,
        threshold,
        overlayColor,
        overlayOpacity,
        initialMap,
        initialDateRange,
        initialThreshold,
        initialOverlayColor,
        initialOverlayOpacity
    ])

    // Update URL when submit button is clicked
    const handleSubmit = useCallback(() => {
        // Create a new URLSearchParams object based on the current URL
        const params = new URLSearchParams(searchParams.toString())

        // Update map parameter
        params.set(PARAM_NAMES.MAP, selectedMap)

        // Update date range parameters
        if (dateRange?.from) {
            params.set(PARAM_NAMES.FROM_DATE, format(dateRange.from, "yyyy-MM-dd"))
            if (dateRange.to) {
                params.set(PARAM_NAMES.TO_DATE, format(dateRange.to, "yyyy-MM-dd"))
            }
        }

        // Update threshold parameter
        params.set(PARAM_NAMES.THRESHOLD, threshold.toString())

        // Update overlay color parameter
        params.set(PARAM_NAMES.OVERLAY_COLOR, overlayColor)

        // Update overlay opacity parameter
        params.set(PARAM_NAMES.OVERLAY_OPACITY, Math.round(overlayOpacity).toString())

        // Set loading state to true before navigation
        setIsNavigating(true)

        // Update the URL without refreshing the page
        router.push(`/analytics/unplayable-maps?${params.toString()}`, { scroll: false })

        // Reset dirty state
        setIsDirty(false)
    }, [router, searchParams, selectedMap, dateRange, threshold, overlayColor, overlayOpacity, setIsNavigating])

    // Remove automatic URL updates when filters change
    // (We've replaced this with the submit button)
    // useEffect(() => {
    //     updateUrl()
    // }, [selectedMap, dateRange, threshold, overlayColor, overlayOpacity, updateUrl])

    // Format date range to prevent overflow
    const formatDateRange = () => {
        if (!dateRange?.from) return <span>Select dates</span>

        if (dateRange.to) {
            return (
                <span className="text-xs">
                    {format(dateRange.from, "MMM d, yyyy")} - {format(dateRange.to, "MMM d, yyyy")}
                </span>
            )
        }

        return <span className="text-xs">{format(dateRange.from, "MMM d, yyyy")}</span>
    }

    // Handle color input change
    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Remove # if present
        const color = e.target.value.replace("#", "")
        setOverlayColor(color)
    }

    return (
        <Suspense fallback={<div className="text-center">Loading controls...</div>}>
            <div className="space-y-6">
                {/* Map Selection */}
                <div className="space-y-2">
                    <Label htmlFor="map-select">Map</Label>
                    <Select
                        value={selectedMap}
                        onValueChange={setSelectedMap}
                        disabled={isNavigating}
                    >
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
                                disabled={isNavigating}
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
                                onSelect={(range) => range && setDateRange(range)}
                                numberOfMonths={2}
                                disabled={isNavigating}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Threshold Slider */}
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <Label htmlFor="threshold-slider">Threshold</Label>
                        <span className="text-sm text-muted-foreground">{threshold.toFixed(2)}</span>
                    </div>
                    <Slider
                        id="threshold-slider"
                        min={0}
                        max={1}
                        step={0.01}
                        value={[threshold]}
                        onValueChange={(values) => setThreshold(values[0])}
                        disabled={isNavigating}
                    />
                </div>

                {/* Overlay Color */}
                <div className="space-y-2">
                    <Label htmlFor="overlay-color">Overlay Color</Label>
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                            <Input
                                id="overlay-color"
                                type="color"
                                value={`#${overlayColor}`}
                                onChange={(e) => {
                                    // Remove the # and update state
                                    const color = e.target.value.replace("#", "")
                                    setOverlayColor(color)
                                }}
                                className="w-12 h-10 p-1 cursor-pointer"
                                disabled={isNavigating}
                            />
                            <Input
                                type="text"
                                value={overlayColor}
                                onChange={handleColorChange}
                                className="flex-1"
                                maxLength={6}
                                placeholder="FF0000"
                                disabled={isNavigating}
                            />
                        </div>
                        <div className="h-8 rounded border" style={{ backgroundColor: `#${overlayColor}` }} aria-hidden="true" />
                    </div>
                </div>

                {/* Overlay Opacity */}
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <Label htmlFor="opacity-slider">Overlay Opacity</Label>
                        <span className="text-sm text-muted-foreground">
                            {(overlayOpacity / 255).toFixed(2)} ({Math.round(overlayOpacity)} / 255)
                        </span>
                    </div>
                    <Slider
                        id="opacity-slider"
                        min={0}
                        max={1}
                        step={0.01}
                        value={[overlayOpacity / 255]}
                        onValueChange={(values) => setOverlayOpacity(Math.round(values[0] * 255))}
                        disabled={isNavigating}
                    />
                </div>

                {/* Submit Button */}
                <Button
                    className="w-full"
                    onClick={handleSubmit}
                    disabled={isNavigating || !isDirty}
                >
                    {isNavigating ? (
                        <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Loading Goonology...
                        </>
                    ) : (
                        'Update Map'
                    )}
                </Button>
            </div>
        </Suspense>
    )
}