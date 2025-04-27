import { getTeams } from "@/app/actions/teams";

export default async function RotationsPage() {
    const { success, data: teams, error } = await getTeams()

    
}