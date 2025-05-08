// In your HeatmapPage component
import { DEFAULT_DATE_RANGE, DEFAULT_LIMIT, DEFAULT_MAP_OPTION, DEFAULT_TYPE_OPTION, PARAM_NAMES } from "@/lib/constants";
import { ActionReturn, FilteredMatchesParams, FilteredMatchResponse, getFilteredMatches, getFilteredRandomMatch, getMatchById } from "@/app/actions/matches";
import { format } from "date-fns";
import { Suspense } from "react";
import IGLSimWrapper from "./igl-sim-wrapper";
import { redirect, useRouter } from "next/navigation";

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
        const matchID = result.data?.matches.MatchID
        if (matchID) {
            redirect(`/dashboard/analytics/igl-simulator?${PARAM_NAMES.MATCH_ID}=${matchID}`)
    }
    }


    if (result.error) {
        return <div>{result.error}</div>
    }

    if (!result.data?.matches) {
        return <div>Match not found</div>
    }

    const DEFAULT_FILTER: FilteredMatchesParams = {
        mapName: DEFAULT_MAP_OPTION,
        matchTypes: DEFAULT_TYPE_OPTION,
        from: DEFAULT_DATE_RANGE.from.toString(),
        to: DEFAULT_DATE_RANGE.to.toString(),
        limit: DEFAULT_LIMIT,
    }

    let filter = DEFAULT_FILTER
    if (result.data.filter) {
        filter = result.data.filter
    }

    return (
        <Suspense fallback={<div>Loading heatmap...</div>}>
            <IGLSimWrapper filterParams={filter} match={result.data?.matches} />
        </Suspense>
    )
}

export default IGLSimPage;