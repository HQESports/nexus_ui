import Image from "next/image"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarIcon } from "lucide-react"
import { Team } from "@/app/actions/teams"

interface MiniTeamCardProps {
    team: Team | undefined
}

export function MiniTeamCard({ team }: MiniTeamCardProps) {
    if (!team) {
        return (
            <Card className="overflow-hidden">
                <CardContent className="p-3 text-center">
                    Select a Team to View Rotations
                </CardContent>
            </Card>
        )
    }
    return (
        <Card className="overflow-hidden">
            <CardContent className="p-3">
                {/* Header with image, name and tag */}
                <div className="flex items-center gap-3 mb-2">
                    <div className="relative w-10 h-10 shrink-0">
                        <Image
                            src={team.imageUrl || "/placeholder.svg?height=40&width=40&query=team logo"}
                            alt={`${team.name} logo`}
                            width={40}
                            height={40}
                            className="object-cover rounded-md"
                        />
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold truncate">{team.name}</h3>
                            <Badge variant="outline" className="text-xs px-1 h-5 ml-2 shrink-0">
                                {team.esportTag}
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* Player list */}
                {team.players.length > 0 && (
                    <div className="grid gap-2 mt-2 text-xs">
                        {team.players.map((player, index) => (
                            <div key={index} className="p-2 rounded-sm bg-muted/40">
                                <div className="flex items-center gap-1">
                                    {player.isPriority && <StarIcon className="w-3 h-3 text-secondary-foreground shrink-0" />}
                                    <div className="grid w-full">
                                        <div className="flex justify-between">
                                            <span className="font-medium text-xs">Live IGN:</span>
                                            <span className="truncate ml-2">{player.liveServerIGN}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium text-xs">Event IGN:</span>
                                            <span className="truncate ml-2 text-muted-foreground">{player.eventServerIGN}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
