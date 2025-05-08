import { getPlayers } from "@/app/actions/entities";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function PlayersPage() {
    const { success, data: players, error } = await getPlayers(0, 25);
    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!players) {
        return <div>Loading...</div>;
    }
    console.log(players);

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={players.players} />
        </div>
    )
}