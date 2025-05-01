"use client"

import { Suspense, useEffect, useState } from "react";
import { MiniTeamCard } from "./mini-team-card";
import TeamDropdown, { TeamDropdownOption } from "./team-dropdown";
import { Team, TeamRotationTiny } from "@/app/actions/teams"
import RotationsMatchControls from "./rotations-match-controls";
import { bgColorMap, bgTypeMap, DEFAULT_DATES, FILTER_TYPES, MAP_INFO, MapInfo, ROTATION_MAP_OPTIONS, textColorMap } from "./constants";
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { useRouter, useSearchParams } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Bold, CalendarIcon, CheckIcon, Circle, Clock, Icon, Italic, LayoutList, Plane, Underline } from "lucide-react";
import { cactus } from "@lucide/lab";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DynamicIcon } from "lucide-react/dynamic";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DateRange } from "react-day-picker";
import { Separator } from "@/components/ui/separator";

interface RotationControlsProps {
    teams: Team[]
    teamID: string | undefined
    rotations: TeamRotationTiny[]
    styleOptions: string[]
    setStyleOptions: (options: string[]) => void
}

export default function RotationControls({ teams, teamID, rotations, styleOptions, setStyleOptions }: RotationControlsProps) {
    if (!teamID) teamID = ""
    const [selectedTeam, setSelectedTeam] = useState<Team | undefined>(teams.find((team) => team.id == teamID))
    const [selectedMatchType, setSelectedMatchType] = useState<string>(FILTER_TYPES.ALL)
    const [selectedMap, setSelectedMap] = useState<string>(ROTATION_MAP_OPTIONS[0].value)
    const [selectedRotationID, setRotationID] = useState<string | undefined>(undefined)
    const [filterRotations, setFilteredRotations] = useState<TeamRotationTiny[]>([])
    const [dateRange, setDateRange] = useState<DateRange>(DEFAULT_DATES)

    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        setFilteredRotations(rotations)
    }, [rotations])

    const setSearchParams = (teamID: string | undefined, rotationID: string | undefined, range: undefined | DateRange = undefined) => {
        const params = new URLSearchParams(searchParams.toString())

        if (teamID) {
            params.set("teamID", teamID)
        } else {
            params.delete("teamID")
        }

        if (rotationID) {
            params.set("rotationID", rotationID)
        } else {
            params.delete("rotationID")
        }

        if (range) {
            params.set("startDate", range.from?.toISOString() || "")
            params.set("endDate", range.to?.toISOString() || "")
        } else {
            params.set("startDate", dateRange.from?.toISOString() || "")
            params.set("endDate", dateRange.to?.toISOString() || "")
        }

        router.push(`?${params.toString()}`)
    }

    const teamOptions = teams.map((team) => {
        const teamOption: TeamDropdownOption = {
            value: team.id,
            label: team.name,
            imageUrl: team.imageUrl
        }

        return teamOption
    })

    const onTeamSelect = (value: string) => {
        const teamSearch = teams.find((team) => team.id === value)


        if (value.length == 0) {
            setSelectedTeam(undefined)
            setSearchParams(undefined, undefined)
            return
        }
        setSelectedTeam(teamSearch)
        setSearchParams(value, undefined)
    }

    const onTypeSelect = (value: string) => {
        setSelectedMatchType(value)
    }

    const onMapSelect = (value: string) => {
        if (value != "all") {
            setFilteredRotations(rotations.filter((rotation) => rotation.match.MapName == value))
        } else {
            setFilteredRotations(rotations)
        }
        setSelectedMap(value)
    }

    const onSelectRotation = (value: string) => {
        setRotationID(value)
        setSearchParams(selectedTeam?.id, value)
    }

    const onDateRangeChange = (value: DateRange) => {
        if (value.from && value.to) {
            setDateRange(value)
            setSearchParams(selectedTeam?.id, selectedRotationID, value)
        }
    }

    const buildIcon = (mapInfo: MapInfo) => {
        if (mapInfo.icon == "cactus") {
            return (
                <Icon iconNode={cactus} className="w-6 h-6" />
            )
        }

        return (
            <DynamicIcon name={mapInfo.icon} className="w-6 h-6" />
        )
    }

    return (
        <Suspense fallback={<div>Loading team rotation controls...</div>}>
            <Sidebar side="right" className="border-1">
                <SidebarHeader>
                    <h2 className="text-lg font-semibold mb-3 text-center">Rotation Controls</h2>
                    {/* <MiniTeamCard team={selectedTeam} /> */}
                    <TeamDropdown teamID={teamID} onChange={onTeamSelect} options={teamOptions} />
                    {/* {Match Controls} */}
                    <RotationsMatchControls
                        disabled={selectedTeam == undefined}
                        filterTypeValue={selectedMatchType}
                        onTypeChange={onTypeSelect}
                        filterMapValue={selectedMap} onMapChange={onMapSelect}
                        styleOptions={styleOptions}
                        setStyleOptions={setStyleOptions}
                        dateRange={dateRange}
                        setDateRange={onDateRangeChange} />
                    {/* Style Filter*/}
                    <div className="text-sm font-medium">Draw Options</div>
                    <ToggleGroup type="multiple" variant="outline" className="w-full" onValueChange={(value) => setStyleOptions(value)} value={styleOptions}>
                        <ToggleGroupItem value="circle" aria-label="Toggle bold">
                            <Circle className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="plane" aria-label="Toggle italic">
                            <Plane className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="legend" aria-label="Toggle strikethrough">
                            <LayoutList className="h-4 w-4" />
                        </ToggleGroupItem>
                    </ToggleGroup>
                </SidebarHeader>
                <SidebarContent>
                    <Separator className="my-3" />
                    <div className="text-sm font-medium text-center">{filterRotations.length} Matches</div>
                    <div className="py-2">
                        {filterRotations.length > 0 && rotations.length > 0 ? (
                            <div className="space-y-1 px-1">
                                {filterRotations.map((rotation) => {
                                    const mapInfo = MAP_INFO[rotation.match.MapName]

                                    return (
                                        <button
                                            key={rotation.id}
                                            onClick={() => onSelectRotation(rotation.id)}
                                            className={cn(
                                                "w-full flex items-center px-3 py-2 text-left rounded-md hover:bg-accent/50 transition-colors",
                                                selectedRotationID === rotation.id ? "bg-accent text-accent-foreground" : "",
                                            )}
                                        >
                                            <Avatar className={`h-8 w-8 mr-3`}>
                                                <AvatarFallback className={textColorMap[mapInfo.color]}>
                                                    {buildIcon(mapInfo)}
                                                </AvatarFallback>
                                            </Avatar>

                                            <div className="flex flex-col flex-1">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium">{mapInfo.displayName}</span>
                                                    <span
                                                        className={cn(
                                                            "text-xs text-white px-1.5 py-0.5 rounded-full",
                                                            bgTypeMap[rotation.match.MatchType]
                                                        )}
                                                    >
                                                        {rotation.match.MatchType}
                                                    </span>

                                                </div>
                                                <div className="flex items-center justify-between text-xs mt-1">
                                                    <div className="flex items-center text-muted-foreground">
                                                        <CalendarIcon className="h-3 w-3 mr-1" />
                                                        {new Date(rotation.match.CreatedAt).toLocaleDateString()}
                                                    </div>
                                                    <div
                                                        className={cn(
                                                            "flex items-center gap-1 px-1.5 py-0.5 rounded-full",
                                                            rotation.match.Processed ? "bg-green-100 text-green-700 border-green-700" : "bg-yellow-100 text-yellow-700 border-yellow-700"
                                                        )}
                                                    >
                                                        {rotation.match.Processed ? <CheckIcon className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                                                    </div>
                                                </div>
                                            </div>

                                            {selectedRotationID === rotation.id && <CheckIcon className="h-4 w-4 ml-2 text-primary" />}
                                        </button>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                                No matches found with the selected filters
                            </div>
                        )}
                    </div>
                </SidebarContent>
            </Sidebar >
        </Suspense>
    )
}