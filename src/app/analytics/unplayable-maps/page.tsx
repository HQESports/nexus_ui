import { Suspense } from "react"
import { format, parse } from "date-fns"
import { DEFAULT_VALUES, PARAM_NAMES } from "./constants"
import { UnplayableMapControls } from "./unplayable-map-controls"
import { mapNameMap } from "@/lib/utils"
import Image from "next/image"
import { getUnplayableMapImage } from "@/app/actions/unplayable"
import { ClientImageWrapper } from "./client-image-wrapper"

// Helper function to parse date from URL parameter
function parseDate(dateStr: string | null): Date | undefined {
    if (!dateStr) return undefined
    try {
        return parse(dateStr, "yyyy-MM-dd", new Date())
    } catch (e) {
        return undefined
    }
}


// Create a custom loading component with better UX
function MapLoading() {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full p-8 text-center text-white">
            <div className="w-12 h-12 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin mb-4"></div>
            <p className="text-lg">Loading map data...</p>
            <p className="text-sm text-muted-foreground mt-2">Processing image with your selected parameters</p>
        </div>
    );
}

export default async function UnplayableMapPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    // In Next.js 15, searchParams is a Promise that needs to be awaited
    const resolvedParams = await searchParams

    // Extract parameters with type safety and defaults
    const selectedMap = typeof resolvedParams[PARAM_NAMES.MAP] === 'string'
        ? resolvedParams[PARAM_NAMES.MAP] as string
        : DEFAULT_VALUES.MAP

    // Parse dates from URL parameters with type safety
    const fromDateStr = typeof resolvedParams[PARAM_NAMES.FROM_DATE] === 'string'
        ? resolvedParams[PARAM_NAMES.FROM_DATE] as string
        : null
    const toDateStr = typeof resolvedParams[PARAM_NAMES.TO_DATE] === 'string'
        ? resolvedParams[PARAM_NAMES.TO_DATE] as string
        : null

    const fromDate = parseDate(fromDateStr) || DEFAULT_VALUES.FROM_DATE
    const toDate = parseDate(toDateStr) || DEFAULT_VALUES.TO_DATE

    // Create date range object
    const dateRange = {
        from: fromDate,
        to: toDate,
    }

    // Get threshold value (between 0-1) with type safety
    const thresholdStr = typeof resolvedParams[PARAM_NAMES.THRESHOLD] === 'string'
        ? resolvedParams[PARAM_NAMES.THRESHOLD] as string
        : DEFAULT_VALUES.THRESHOLD.toString()
    const threshold = Number.parseFloat(thresholdStr)

    // Get overlay color (hex without #) with type safety
    const overlayColor = typeof resolvedParams[PARAM_NAMES.OVERLAY_COLOR] === 'string'
        ? resolvedParams[PARAM_NAMES.OVERLAY_COLOR] as string
        : DEFAULT_VALUES.OVERLAY_COLOR

    // Get overlay opacity (0-255) with type safety
    const overlayOpacityStr = typeof resolvedParams[PARAM_NAMES.OVERLAY_OPACITY] === 'string'
        ? resolvedParams[PARAM_NAMES.OVERLAY_OPACITY] as string
        : DEFAULT_VALUES.OVERLAY_OPACITY.toString()
    const overlayOpacity = Number.parseInt(overlayOpacityStr)

    const imgURL = await getUnplayableMapImage(selectedMap, fromDate, toDate, threshold, overlayColor, overlayOpacity);

    return (
        <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden bg-black">
            {/* Main Content - prevent scrolling and remove padding/margin */}
            <div className="flex-1 flex items-center justify-center p-0 m-0 overflow-hidden">
                <Suspense fallback={<MapLoading />}>
                    <ClientImageWrapper src={imgURL} alt={""} width={800} height={800} />
                </Suspense>
            </div>

            {/* Sidebar - allow scrolling only within sidebar */}
            <div className="w-80 border-l bg-background flex flex-col h-full">
                <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold">Unplayable Map Viewer</h2>
                    <p className="text-sm text-muted-foreground">View and analyze unplayable map areas</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    <UnplayableMapControls
                        initialMap={selectedMap}
                        initialDateRange={dateRange}
                        initialThreshold={threshold}
                        initialOverlayColor={overlayColor}
                        initialOverlayOpacity={overlayOpacity}
                    />
                </div>
            </div>
        </div>
    )
}