"use client"

import { Alert } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DEFAULT_DATES, FILTER_TYPES, MAP_FILTERS, ROTATION_MAP_OPTIONS } from "./constants"
import { DateRangePicker, DateRangePickerProps } from "@/components/ui/date-range-picker"
import { DateRange } from "react-day-picker"
import { setDate } from "date-fns"


interface RotationsMatchControls {
    disabled: boolean

    filterTypeValue: string
    onTypeChange: (value: string) => void
    filterMapValue: string
    onMapChange: (value: string) => void
    styleOptions: string[]
    setStyleOptions: (options: string[]) => void
    dateRange: DateRange
    setDateRange: (dateRange: DateRange) => void
}

export default function RotationsMatchControls({ disabled, filterTypeValue, onTypeChange, filterMapValue, onMapChange, dateRange, setDateRange }: RotationsMatchControls) {
    if (disabled) return (<></>)
    return (
        <div className="space-y-2">
            <div className="text-sm font-medium">Match Type</div>
            {/* Match type filter */}
            <Tabs className="w-full" defaultValue={FILTER_TYPES.ALL} value={filterTypeValue} onValueChange={(value) => onTypeChange(value)}>
                <TabsList className="w-full grid grid-cols-3">
                    <TabsTrigger value={FILTER_TYPES.ALL}>All</TabsTrigger>
                    <TabsTrigger value={FILTER_TYPES.SCRIM}>Scrim</TabsTrigger>
                    <TabsTrigger value={FILTER_TYPES.EVENT}>Event</TabsTrigger>
                </TabsList>
            </Tabs>
            <Separator className="my-3" />

            {/* Match map filter selector */}
            <div className="text-sm font-medium">Map Select</div>
            <Select value={filterMapValue} onValueChange={(value) => onMapChange(value)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a map" />
                </SelectTrigger>
                <SelectContent>
                    {ROTATION_MAP_OPTIONS.map((mapFilter) => {
                        return (
                            <SelectItem key={mapFilter.value} value={mapFilter.value}>
                                {mapFilter.label}
                            </SelectItem>
                        )
                    })}
                </SelectContent>
            </Select>
            {/* {Date range picker} */}
            <div className="text-sm font-medium">Date Range</div>
            <DateRangePicker
                onUpdate={(value) => setDateRange(value.range)}
                initialDateFrom={dateRange.from}
                initialDateTo={dateRange.to}
                align="start"
                locale="en-GB"
                showCompare={false}
            />
        </div>
    )
}