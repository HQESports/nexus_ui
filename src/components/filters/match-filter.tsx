import { Suspense, useEffect, useState } from "react";
import MapFilterSelect from "./map-filter";
import { DEFAULT_DATE_RANGE, DEFAULT_LIMIT, DEFAULT_MAP_OPTION, DEFAULT_TYPE_OPTION, LIMIT_MAX, LIMIT_MIN, MAP_OPTIONS, MATCH_TYPE_OPTIONS, PARAM_NAMES } from "@/lib/constants";
import { DateRange } from "react-day-picker";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "../ui/sidebar";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { DateRangePicker } from "../ui/date-range-picker";
import { format } from "date-fns";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "../ui/badge";
import { FilteredMatchesParams } from "@/app/actions/matches";

interface MatchFilterProps {
    count: number;
    filterParams: FilteredMatchesParams
}

export default function MatchFilter({ filterParams, count }: MatchFilterProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    // State variables
    const [isLoading, setIsLoading] = useState(false);
    // Match filter state
    const [selectedMap, setSelectedMap] = useState(filterParams.mapName ?? DEFAULT_MAP_OPTION);

    const range = {
        from: filterParams.from ? new Date(filterParams.from) : DEFAULT_DATE_RANGE.from,
        to: filterParams.to ? new Date(filterParams.to) : DEFAULT_DATE_RANGE.to,
    }
    const [dateRange, setDateRange] = useState<DateRange>(range);
    const [matchTypes, setMatchTypes] = useState<string[]>(filterParams.matchTypes ?? DEFAULT_TYPE_OPTION);
    const [limit, setLimit] = useState<number>(filterParams.limit ?? DEFAULT_LIMIT);

    const setParams = () => {
        const params = new URLSearchParams(searchParams.toString());

        let fromDate = dateRange.from
        if (!fromDate) {
            fromDate = DEFAULT_DATE_RANGE.from
        }

        let toDate = dateRange.to
        if (!toDate) {
            toDate = DEFAULT_DATE_RANGE.to
        }

        params.set(PARAM_NAMES.MAP, selectedMap);
        params.set(PARAM_NAMES.FROM_DATE, format(fromDate, "yyyy-MM-dd"));
        params.set(PARAM_NAMES.TO_DATE, format(toDate, "yyyy-MM-dd"));
        params.set(PARAM_NAMES.MATCH_TYPES, matchTypes.join(","));
        params.set(PARAM_NAMES.LIMIT, limit.toString());

        router.push(`?${params.toString()}`, { scroll: false })
    }

    const handleMapChange = (map: string) => {
        setSelectedMap(map);
    };

    const handleTypeChange = (types: string[]) => {
        setMatchTypes(types);
    };

    const handleDateRange = (range: DateRange) => {
        setDateRange(range);
    };

    const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number.parseInt(e.target.value, 10)

        if (isNaN(newValue)) {
            setLimit(DEFAULT_LIMIT)
            return
        }

        const min = LIMIT_MIN
        const max = LIMIT_MAX

        // Clamp value between min and max
        const clampedValue = Math.min(Math.max(newValue, min), max)
        setLimit(clampedValue)
    }

    return (
        <Suspense fallback={<div>Loading match filters...</div>}>
            <SidebarGroup className="border-b-2">
                <SidebarGroupContent className="space-y-3">
                    <div className="text-lg w-full text-center text-primary font-bold">Match Filters</div>
                    <div className="flex items-center justify-between">
                        <Label>Matches Found</Label>
                        {limit == count ? <Badge className="bg-yellow-400">{count}/{limit}</Badge> : <Badge className="bg-green-400">{count}/{limit}</Badge>}
                    </div>
                    {/* Map filter */}
                    <Label>Map Selection</Label>
                    <Select onValueChange={handleMapChange} disabled={isLoading} value={selectedMap}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select map" className="w-full" />
                        </SelectTrigger>
                        <SelectContent>
                            {MAP_OPTIONS.map((map) => (
                                <SelectItem key={map.id} value={map.id}>
                                    {map.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Match Type Filter */}
                    <Label>Select Match Type</Label>
                    <ToggleGroup type="multiple" className="w-full" variant="outline" value={matchTypes} onValueChange={handleTypeChange} >
                        {MATCH_TYPE_OPTIONS.map((option) => (
                            <ToggleGroupItem
                                key={option.id}
                                value={option.id}
                                className="w-full hover:bg-transparent"
                            >
                                {option.label}
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>

                    {/* Date Range Selector */}
                    <Label>Date Range</Label>
                    <DateRangePicker
                        onUpdate={(value) => handleDateRange(value.range)}
                        initialDateFrom={dateRange.from}
                        initialDateTo={dateRange.to}
                        align="start"
                        locale="en-GB"
                        showCompare={false}
                    />
                    <Label>Matches Limit</Label>
                    <Input type="number" placeholder="Limit" className="w-full" value={limit} onChange={handleLimitChange} />
                    <Button className="w-full mb-2" onClick={() => setParams()}>Filter Matches</Button>
                </SidebarGroupContent>
            </SidebarGroup >
        </Suspense>
    )
}