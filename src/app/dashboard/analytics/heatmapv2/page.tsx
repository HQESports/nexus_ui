import { DEFAULT_DATE_RANGE, DEFAULT_LIMIT, DEFAULT_MAP_OPTION, DEFAULT_TYPE_OPTION, PARAM_NAMES } from "@/lib/constants";
import HeatmapWrapper from "./heatmap-wrapper";
import { DEFAULT_VALUES } from "../heatmap/constants";
import { FilteredMatchesParams, getFilteredMatches } from "@/app/actions/matches";
import { format } from "date-fns";

export default async function HeatmapPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const params = await searchParams
    const map = params[PARAM_NAMES.MAP] || DEFAULT_MAP_OPTION
    const fromDate = params[PARAM_NAMES.FROM_DATE] || DEFAULT_DATE_RANGE.from
    const toDate = params[PARAM_NAMES.TO_DATE] || DEFAULT_DATE_RANGE.to
    const matchTypes = params[PARAM_NAMES.MATCH_TYPES]?.split(',') || DEFAULT_TYPE_OPTION
    let limit = DEFAULT_LIMIT

    if (!isNaN(Number(params[PARAM_NAMES.LIMIT]))) {
        limit = Number(params[PARAM_NAMES.LIMIT])
    }
    const filterParams: FilteredMatchesParams = {
        mapName: map,
        matchTypes: matchTypes,
        from: format(fromDate, "yyyy-MM-dd"),
        to: format(toDate, "yyyy-MM-dd"),
        limit: limit
    }
    const result = await getFilteredMatches(filterParams);

    console.log(result.data?.count)
    if (result.error) {
        return <div>{result.error}</div>
    }

    if (!result.data?.matches) {
        return <div>Womp Womp</div>
    }

    return (
        <div className="overflow-hidden">
            <HeatmapWrapper map={map} matchesResponse={result.data} filterParams={filterParams} />
        </div>
    )
}