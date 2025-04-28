"use client"

import { TeamResponse, TeamRotation, TeamRotationTiny } from "@/app/actions/teams"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import TeamRotationsCanvas from "./team-rotation-canvas"
import { Terminal } from "lucide-react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import RotationControls from "./rotation-controls"
import { useState } from "react"

interface TeamRotationWrapperProps {
    teamID: string | undefined
    rotations: TeamRotationTiny[]
    rotation: TeamRotation | undefined
    teams: TeamResponse[]
}

export default function TeamRotationWrapper({ teamID, rotations, rotation, teams }: TeamRotationWrapperProps) {
    const [styleOptions, setStyleOptions] = useState<string[]>(["circle", "plane", "legend"])
    return (
        <SidebarProvider>
            <SidebarInset>
                {rotation && <div className="max-h- w-full">
                    <TeamRotationsCanvas rotation={rotation} styleOptions={styleOptions} />
                </div>}
                {!rotation && <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                        You need to select a team and a match to view their rotation
                    </AlertDescription>
                </Alert>}
            </SidebarInset>
            <RotationControls
                teams={teams}
                teamID={teamID}
                rotations={rotations}
                styleOptions={styleOptions}
                setStyleOptions={setStyleOptions}
            />
        </SidebarProvider>
    )
}