// In your HeatmapPage component
import { DEFAULT_DATE_RANGE, DEFAULT_LIMIT, DEFAULT_MAP_OPTION, DEFAULT_TYPE_OPTION, PARAM_NAMES } from "@/lib/constants";
import { ActionReturn, FilteredMatchesParams, FilteredMatchResponse, getFilteredMatches, getFilteredRandomMatch, getMatchById } from "@/app/actions/matches";
import { format } from "date-fns";
import { Suspense } from "react";
import IGLSimWrapper from "./igl-sim-wrapper";
import { redirect } from "next/navigation";
async function IGLSimPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {

    const params = await searchParams

    const match_id = params[PARAM_NAMES.MATCH_ID] || undefined
    const map = params[PARAM_NAMES.MAP] || DEFAULT_MAP_OPTION
    const fromDate = params[PARAM_NAMES.FROM_DATE] || DEFAULT_DATE_RANGE.from
    const toDate = params[PARAM_NAMES.TO_DATE] || DEFAULT_DATE_RANGE.to
    const matchTypes = params[PARAM_NAMES.MATCH_TYPES]?.split(',') || DEFAULT_TYPE_OPTION
    let result: ActionReturn<FilteredMatchResponse> | undefined = undefined
    const filterParams: FilteredMatchesParams = {
        mapName: map,
        matchTypes: matchTypes,
        from: format(fromDate, "yyyy-MM-dd"),
        to: format(toDate, "yyyy-MM-dd"),
    }

    if (match_id) {
        result = await getMatchById(match_id)
    } else {
        result = await getFilteredRandomMatch(filterParams)
    }

    if (result.error) {
        return <div>{result.error}</div>
    }

    if (!result.data?.matches) {
        return <div>Match not found</div>
    }

    if (!match_id) {
        const matchID = result.data?.matches.MatchID
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.set(PARAM_NAMES.MAP, map);
        urlSearchParams.set(PARAM_NAMES.MATCH_TYPES, matchTypes.join(","));
        if (matchID) {
            urlSearchParams.set(PARAM_NAMES.MATCH_ID, matchID);
            redirect(`?${urlSearchParams.toString()}`)
        }
    }

    return (
        <Suspense fallback={<div>Loading heatmap...</div>}>
            <IGLSimWrapper filterParams={filterParams} match={result.data?.matches} />
        </Suspense>
    )
}

export default IGLSimPage;