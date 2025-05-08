// In your HeatmapPage component
import { DEFAULT_DATE_RANGE, DEFAULT_LIMIT, DEFAULT_MAP_OPTION, DEFAULT_TYPE_OPTION, PARAM_NAMES } from "@/lib/constants";
import { ActionReturn, FilteredMatchesParams, FilteredMatchResponse, getFilteredMatches, getFilteredRandomMatch, getMatchById } from "@/app/actions/matches";
import { format } from "date-fns";
import { Suspense } from "react";
import IGLSimWrapper from "./igl-sim-wrapper";
import { useRouter } from "next/navigation";

async function IGLSimPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {

    const params = await searchParams

    const match_id = params[PARAM_NAMES.MATCH_ID] || undefined
    let result: ActionReturn<FilteredMatchResponse> | undefined = undefined
    if (match_id) {
        result = await getMatchById(match_id)
    } else {
        const map = params[PARAM_NAMES.MAP] || DEFAULT_MAP_OPTION
        const fromDate = params[PARAM_NAMES.FROM_DATE] || DEFAULT_DATE_RANGE.from
        const toDate = params[PARAM_NAMES.TO_DATE] || DEFAULT_DATE_RANGE.to
        const matchTypes = params[PARAM_NAMES.MATCH_TYPES]?.split(',') || DEFAULT_TYPE_OPTION

        const filterParams: FilteredMatchesParams = {
            mapName: map,
            matchTypes: matchTypes,
            from: format(fromDate, "yyyy-MM-dd"),
            to: format(toDate, "yyyy-MM-dd"),
        }

        result = await getFilteredRandomMatch(filterParams)
    }
    if (result.error) {
        return <div>{result.error}</div>
    }

    if (!result.data?.matches) {
        return <div>Womp Womp</div>
    }



    return (
        <Suspense fallback={<div>Loading heatmap...</div>}>
            <IGLSimWrapper filterParams={result.data.filter} match={result.data.matches} map={result.data.filter.mapName} />
        </Suspense>
    )
}

export default IGLSimPage;