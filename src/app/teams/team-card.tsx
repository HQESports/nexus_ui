import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarIcon, Users } from "lucide-react"
import { Team } from "../actions/teams"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface TeamCardProps {
    team: Team
}

export function TeamCard({ team }: TeamCardProps) {
    return (
        <Card className="overflow-hidden">
            <div className="relative w-full h-[200px]">
                <Image
                    src={team.imageUrl || "/placeholder.svg?height=200&width=200&query=team logo"}
                    alt={`${team.name} logo`}
                    width={200}
                    height={200}
                    className="object-cover w-[200px] h-[200px] mx-auto"
                />
            </div>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold">{team.name}</CardTitle>
                    <Badge variant="outline" className="ml-2">
                        {team.esportTag}
                    </Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-1" />
                    <span>Search Count: {team.searchCount}</span>
                </div>
            </CardHeader>
            <CardContent>
                <h3 className="mb-2 font-medium">Players</h3>
                <div className="space-y-2">
                    {team.players.map((player, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                            <div className="flex items-center gap-2">
                                <Avatar className="w-8 h-8">
                                    <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium">{player.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {player.liveServerIGN} / {player.eventServerIGN}
                                    </p>
                                </div>
                            </div>
                            {player.isPriority && (
                                <Badge variant="secondary" className="flex items-center gap-1">
                                    <StarIcon className="w-3 h-3" />
                                    Priority
                                </Badge>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
