import { getTeams } from "@/app/actions/teams";
import { TeamCard } from "./team-card";
import TeamList from "./teams-list";
export const dynamic = 'force-dynamic';


export default async function Page() {
    const { success, data: teams, error } = await getTeams()
    if (!teams) {
        return <div>No teams</div>
    }
    return (
        <div className="container py-10 px-6">
            <TeamList teams={teams} />
        </div>
    )
}
