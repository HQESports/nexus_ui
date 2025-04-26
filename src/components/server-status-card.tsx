import { getJobs, getServerStatus } from "@/app/actions/job";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Folder, HardDrive, RabbitIcon, Server } from "lucide-react"

export default async function StatusCard() {
    // Mock response data
    const { success, data: serverStatus, error } = await getServerStatus();

    if (!success) {
        return <div>Failed</div>
    }

    if (!serverStatus) {
        return <div>Failed</div>
    }

    if (error) {
        return <div>Error</div>
    }


    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Current status of all services</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Server className="h-5 w-5 text-muted-foreground" />
                        <span>Server</span>
                    </div>
                    <StatusIndicator isOnline={serverStatus.server} />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <HardDrive className="h-5 w-5 text-muted-foreground" />
                        <span>Cache</span>
                    </div>
                    <StatusIndicator isOnline={serverStatus.cache} />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Database className="h-5 w-5 text-muted-foreground" />
                        <span>Database</span>
                    </div>
                    <StatusIndicator isOnline={serverStatus.database} />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <RabbitIcon className="h-5 w-5 text-muted-foreground" />
                        <span>RabbitMQ</span>
                    </div>
                    <StatusIndicator isOnline={serverStatus.rabbit} />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Folder className="h-5 w-5 text-muted-foreground" />
                        <span>File Service</span>
                    </div>
                    <StatusIndicator isOnline={serverStatus.file_service} />
                </div>
            </CardContent>
        </Card>
    )
}

function StatusIndicator({ isOnline }: { isOnline: boolean }) {
    return (
        <div className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"}`} />
            <span className={isOnline ? "text-green-500" : "text-red-500"}>{isOnline ? "Online" : "Offline"}</span>
        </div>
    )
}
