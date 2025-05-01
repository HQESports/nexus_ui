// page.tsx for "/dashboard/analytics/team-rotations"
import { getRotation, getTeamRotations, getTeams, TeamRotation, TeamRotationTiny } from "@/app/actions/teams";
import { Suspense } from "react";
import TeamRotationWrapper from "./team-rotation-wrapper";
import { DEFAULT_DATES } from "./constants";

export default async function RotationsPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined }
}) {
    const { teamID, rotationID, startDate, endDate } = await searchParams
    const { success, data: teams, error } = await getTeams()

    if (!teams) {
        return <div>No teams available</div>
    }

    let start = DEFAULT_DATES.from
    let end = DEFAULT_DATES.to

    if (startDate) {
        start = new Date(startDate)
    }

    if (endDate) {
        end = new Date(endDate)
    }

    let rotationData: TeamRotationTiny[] = []
    if (teamID) {
        const { success, data, error } = await getTeamRotations(teamID, start, end)
        if (data) {
            rotationData = data
        }
    }

    let rotation: TeamRotation | undefined = undefined

    if (rotationID) {
        const { success, data, error } = await getRotation(rotationID)
        if (data) {
            rotation = data
        }
    }

    return (
        // Make sure TeamRotationWrapper is wrapped in a Suspense boundary
        <Suspense fallback={<div>Loading team rotation data...</div>}>
            <TeamRotationWrapper
                teamID={teamID}
                rotations={rotationData}
                rotation={rotation}
                teams={teams}
            />
        </Suspense>
    )
}