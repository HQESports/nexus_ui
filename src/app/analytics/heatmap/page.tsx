import { Suspense } from "react"
import { parse } from "date-fns"
import { MapCanvas } from "./map-canvas"
import { MapControlsWrapper } from "./map-controls-wrapper"
import { DEFAULT_VALUES, PARAM_NAMES } from "./constants"
import { getFilteredMatches } from "@/app/actions/matches"

// Helper function to parse date from URL parameter
function parseDate(dateStr: string | null): Date | undefined {
    if (!dateStr) return undefined
    try {
        return parse(dateStr, "yyyy-MM-dd", new Date())
    } catch (e) {
        return undefined
    }
}

// Helper function to parse comma-separated list from URL parameter
function parseCommaSeparatedList(param: string | string[] | undefined, defaultValue: string[]): string[] {
    if (!param) return defaultValue

    // If it's a string, split by comma; if it's an array, use the first item and split it
    const valueStr = Array.isArray(param) ? param[0] : param
    return valueStr.split(",").filter(Boolean)
}

function formatDateToYYYYMMDD(date: Date | undefined): string {
    if (!date) {
        return ""
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

// This is a server component that reads from URL parameters
export default async function MapViewerPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    // Extract parameters with defaults
    const selectedMap = (searchParams[PARAM_NAMES.MAP] as string) || DEFAULT_VALUES.MAP

    // Parse dates from URL parameters
    const fromDate = parseDate(searchParams[PARAM_NAMES.FROM_DATE] as string | null)
    const toDate = parseDate(searchParams[PARAM_NAMES.TO_DATE] as string | null)

    // Create date range object if we have dates
    const dateRange = fromDate
        ? {
            from: fromDate,
            to: toDate,
        }
        : undefined

    // Parse match types from comma-separated list
    const matchTypes = parseCommaSeparatedList(searchParams[PARAM_NAMES.MATCH_TYPES], DEFAULT_VALUES.MATCH_TYPES)

    // Parse phases from comma-separated list
    const selectedPhases = parseCommaSeparatedList(searchParams[PARAM_NAMES.PHASES], DEFAULT_VALUES.PHASES)

    // Get selected style
    const selectedStyle = (searchParams[PARAM_NAMES.STYLE] as string) || DEFAULT_VALUES.STYLE

    const result = await getFilteredMatches({
        mapName: selectedMap,
        matchTypes: matchTypes,
        startDate: formatDateToYYYYMMDD(fromDate),
        endDate: formatDateToYYYYMMDD(toDate),
        limit: 100000
    });
    if (result.error) {
        return <div>{result.error}</div>
    }

    if (!result.data?.matches) {
        return <div>Womp Womp</div>
    }

    return (
        <div className="flex h-screen overflow-hidden bg-black">
            {/* Main Content - prevent scrolling and remove padding/margin */}
            <div className="flex-1 flex items-center justify-center p-0 m-0 overflow-hidden">
                <Suspense fallback={<div className="p-8 text-center text-white">Loading map...</div>}>
                    <MapCanvas selectedMap={selectedMap} selectedStyle={selectedStyle} selectedPhases={selectedPhases} matches={result.data.matches} />
                </Suspense>
            </div>

            {/* Sidebar - allow scrolling only within sidebar */}
            <div className="w-64 border-l bg-background flex flex-col h-screen">
                <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold">Map Viewer</h2>
                    <p className="text-sm text-muted-foreground">Matches Found: {result.data.count}</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    <MapControlsWrapper
                        initialMap={selectedMap}
                        initialDateRange={dateRange}
                        initialMatchTypes={matchTypes}
                        initialStyle={selectedStyle}
                        initialPhases={selectedPhases}
                    />
                </div>
            </div>
        </div>
    )
}
