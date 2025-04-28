import { getRotation, getTeamRotations, getTeams, TeamRotation, TeamRotationTiny } from "@/app/actions/teams";
import { Suspense } from "react";
import TeamRotationsCanvas from "./team-rotation-canvas";
import RotationControls from "./rotation-controls";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DynamicIcon } from 'lucide-react/dynamic';
import { Icon, Terminal, Trees } from "lucide-react";
import { cactus } from "@lucide/lab";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import TeamRotationWrapper from "./team-rotation-wrapper";
import { start } from "repl";
import { DEFAULT_DATES } from "./constants";

export default async function RotationsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
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
        <TeamRotationWrapper teamID={teamID} rotations={rotationData} rotation={rotation} teams={teams} />
    )
}