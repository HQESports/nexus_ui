"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search } from "lucide-react"
import type { TeamResponse } from "../actions/teams"
import { TeamCard } from "./team-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function TeamList({ teams }: { teams: TeamResponse[] }) {
    const [searchQuery, setSearchQuery] = useState("")

    // Filter teams based on search query
    const filteredTeams = teams.filter((team) => {
        const query = searchQuery.toLowerCase()

        // Search by team name
        if (team.name.toLowerCase().includes(query)) return true

        // Search by esport tag
        if (team.esportTag.toLowerCase().includes(query)) return true

        // Search by player names
        const hasMatchingPlayer = team.players.some((player) => player.name.toLowerCase().includes(query))

        return hasMatchingPlayer
    })

    return (
        <div className="container py-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                <h1 className="text-3xl font-bold">Team Details</h1>

                <div className="flex w-full md:w-auto gap-4 items-center">
                    {/* Search bar using shadcn Input */}
                    <div className="relative flex-1 w-full md:w-64">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Input
                            type="text"
                            className="pl-10 w-full"
                            placeholder="Search teams or players..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Create new team link with icon */}
                    <Button variant="outline" asChild className="whitespace-nowrap">
                        <Link href="/teams/new">
                            <Plus className="mr-2 h-4 w-4" />
                            Create New Team
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Team grid */}
            {filteredTeams.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTeams.map((team) => (
                        <TeamCard key={team.id} team={team} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-muted-foreground">No teams found matching your search criteria.</p>
                </div>
            )}
        </div>
    )
}
