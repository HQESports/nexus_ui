"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import type { DateRange } from "react-day-picker"
import { format } from "date-fns"
import { MapControls } from "./map-controls"
import { PARAM_NAMES } from "./constants"

interface MapControlsWrapperProps {
    initialMap: string
    initialDateRange?: { from: Date; to?: Date }
    initialMatchTypes: string[]
    initialStyle: string
    initialPhases: string[]
}

export function MapControlsWrapper({
    initialMap,
    initialDateRange,
    initialMatchTypes,
    initialStyle,
    initialPhases,
}: MapControlsWrapperProps) {
    // Local state that starts with the initial values from URL
    const [selectedMap, setSelectedMap] = useState<string>(initialMap)
    const [dateRange, setDateRange] = useState<DateRange | undefined>(initialDateRange)
    const [matchTypes, setMatchTypes] = useState<string[]>(initialMatchTypes)
    const [selectedStyle, setSelectedStyle] = useState<string>(initialStyle)
    const [selectedPhases, setSelectedPhases] = useState<string[]>(initialPhases)

    const router = useRouter()
    const searchParams = useSearchParams()

    // Update URL when filters change
    const updateUrl = useCallback(() => {
        // Create a new URLSearchParams object based on the current URL
        const params = new URLSearchParams(searchParams.toString())

        // Update map parameter
        params.set(PARAM_NAMES.MAP, selectedMap)

        // Update date range parameters
        if (dateRange?.from) {
            params.set(PARAM_NAMES.FROM_DATE, format(dateRange.from, "yyyy-MM-dd"))
            if (dateRange.to) {
                params.set(PARAM_NAMES.TO_DATE, format(dateRange.to, "yyyy-MM-dd"))
            } else {
                params.delete(PARAM_NAMES.TO_DATE)
            }
        } else {
            params.delete(PARAM_NAMES.FROM_DATE)
            params.delete(PARAM_NAMES.TO_DATE)
        }

        // Update match types parameter as a comma-separated list
        if (matchTypes.length > 0) {
            params.set(PARAM_NAMES.MATCH_TYPES, matchTypes.join(","))
        } else {
            params.delete(PARAM_NAMES.MATCH_TYPES)
        }

        // Update phases parameter as a comma-separated list
        if (selectedPhases.length > 0) {
            params.set(PARAM_NAMES.PHASES, selectedPhases.join(","))
        } else {
            params.delete(PARAM_NAMES.PHASES)
        }

        // Update style parameter
        params.set(PARAM_NAMES.STYLE, selectedStyle)

        // Update the URL without refreshing the page
        router.push(`/analytics/heatmap?${params.toString()}`, { scroll: false })
    }, [router, searchParams, selectedMap, dateRange, matchTypes, selectedStyle, selectedPhases])

    // Update URL whenever any filter changes
    useEffect(() => {
        updateUrl()
    }, [selectedMap, dateRange, matchTypes, selectedStyle, selectedPhases, updateUrl])

    // Custom handlers that update both state and URL
    const handleMapChange = (map: string) => {
        setSelectedMap(map)
    }

    const handleDateRangeChange = (range: DateRange | undefined) => {
        setDateRange(range)
    }

    const handleMatchTypesChange = (types: string[]) => {
        setMatchTypes(types)
    }

    const handleStyleChange = (style: string) => {
        setSelectedStyle(style)
    }

    const handlePhasesChange = (phases: string[]) => {
        setSelectedPhases(phases)
    }

    return (
        <MapControls
            selectedMap={selectedMap}
            setSelectedMap={handleMapChange}
            dateRange={dateRange}
            setDateRange={handleDateRangeChange}
            matchTypes={matchTypes}
            setMatchTypes={handleMatchTypesChange}
            selectedStyle={selectedStyle}
            setSelectedStyle={handleStyleChange}
            selectedPhases={selectedPhases}
            setSelectedPhases={handlePhasesChange}
        />
    )
}
