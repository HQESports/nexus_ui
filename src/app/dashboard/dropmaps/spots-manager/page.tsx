import { Suspense } from "react";
import SpotsManagerWrapper from "./spots-manager-wrapper";
import { DEFAULT_MAP_OPTION, PARAM_NAMES } from "@/lib/constants";
import { DropspotLocation } from "@/lib/models";

export default async function SpotsManagerPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const params = await searchParams
    const map = params[PARAM_NAMES.MAP] || DEFAULT_MAP_OPTION

    const dropspotLocations: DropspotLocation[] = [] // TODO: Fetch dropspot locations from the server

    return (
        <Suspense fallback={<div>Loading spots manager...</div>}>
            <SpotsManagerWrapper map={map} dropspotLocations={dropspotLocations} />
        </Suspense>
    )
}