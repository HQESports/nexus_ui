"use client"

import { Clock, MoreHorizontal, RefreshCw, CheckCircle2, XCircle, Loader2, PauseCircle, Timer } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Job } from "@/app/actions/job"
import { calculatePercentage, calculateRatePerSecond, calculateTimeRemaining, getElapsedTime } from "@/lib/utils"

interface JobCardProps {
    job: Job
}

export function JobCard({ job }: JobCardProps) {
    // Get status badge color
    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "bg-green-500"
            case "processing":
                return "bg-blue-500"
            case "pending":
                return "bg-yellow-500"
            case "failed":
                return "bg-red-500"
            case "cancelled":
                return "bg-gray-500"
            default:
                return "bg-gray-500"
        }
    }

    // Get status icon
    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed":
                return <CheckCircle2 className="h-5 w-5 text-green-500" />
            case "processing":
                return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
            case "pending":
                return <Clock className="h-5 w-5 text-yellow-500" />
            case "failed":
                return <XCircle className="h-5 w-5 text-red-500" />
            case "cancelled":
                return <PauseCircle className="h-5 w-5 text-gray-500" />
            default:
                return null
        }
    }


    const progress = Math.round(job.metrics?.batches_complete / job.metrics?.total_batches * 100)

    return (
        <Card
            className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full"
        >
            <div className={`h-1 ${getStatusColor(job.status)}`} />
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                        {getStatusIcon(job.status)}
                        <Badge className={`${getStatusColor(job.status)} text-white`}>{job.status}</Badge>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                        <Timer className="h-3 w-3 mr-1" />
                        <span>{getElapsedTime(new Date(job.created_at), new Date(job.updated_at))}</span>
                    </div>
                </div>
                <CardTitle className="text-base truncate mt-2">{job.type}</CardTitle>
                <CardDescription className="font-mono text-xs truncate">{job.id}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2 flex-grow">
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span>Progress:</span>
                        <span className="font-medium">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    {job.status == "processing" && <p className="text-xs text-gray-500">{calculateTimeRemaining(new Date(job.created_at), new Date(job.updated_at), progress)}</p>}
                    {job.metrics && (
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs mt-3 bg-muted p-2 rounded-md">
                            <div className="flex items-center justify-between">
                                <span>Processed:</span>
                                <span className="font-medium">{job.metrics.processed_items.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Success:</span>
                                <span className="font-medium text-green-500">{job.metrics.success_count.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Warnings:</span>
                                <span className={`font-medium ${job.metrics.warning_count > 0 ? "text-yellow-500" : ""}`}>
                                    {job.metrics.warning_count.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Invalids:</span>
                                <span className={`font-medium ${job.metrics.invalid_count > 0 ? "text-orange-500" : ""}`}>
                                    {job.metrics.invalid_count.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Failures:</span>
                                <span className={`font-medium ${job.metrics.failure_count > 0 ? "text-red-500" : ""}`}>
                                    {job.metrics.failure_count.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Success Rate:</span>
                                <span className={`font-medium ${job.metrics.success_count > 0 ? "text-green-300" : ""}`}>
                                    {calculatePercentage(job.metrics.success_count, job.metrics.processed_items, 2)}%
                                </span>
                            </div>
                            <div className="col-span-2 flex items-center justify-between border-t border-muted-foreground/20 pt-1 mt-1">
                                <span>Batches Complete:</span>
                                <span className="font-medium">{job.metrics.batches_complete} / {job.metrics.total_batches}</span>
                            </div>
                            <div className="col-span-2 flex items-center justify-between border-t border-muted-foreground/20 pt-1 mt-1">
                                <span>Process Frequency:</span>
                                <span className="font-medium">{calculateRatePerSecond(new Date(job.created_at), new Date(job.updated_at), job.metrics.processed_items)} hz</span>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter className="pt-2 mt-auto border-t border-muted-foreground/10">
                <div className="w-full flex justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Created: {(new Date(job.created_at).toLocaleString())}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <RefreshCw className="h-3 w-3" />
                        <span>Updated: {new Date(job.updated_at).toLocaleString()}</span>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}