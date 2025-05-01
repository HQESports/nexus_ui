// app/components/JobSelector.tsx
"use client"

import { useState, useEffect } from "react"
import type { JobType } from "@/app/actions/job"
import { startJob, cancelJob } from "@/app/actions/job"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { PlayIcon, XIcon } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner" // Optional: add toast for notifications

interface JobSelectorProps {
    jobTypes: Array<JobType>
}

export function JobSelector({ jobTypes }: JobSelectorProps) {
    jobTypes = jobTypes.sort((a, b) => {
        return a.job_name.localeCompare(b.job_name);
    });
    const [selectedJobType, setSelectedJobType] = useState<string>("")
    const [isPending, setIsPending] = useState(false)

    // Set the first job type as default when component mounts or jobTypes changes
    useEffect(() => {
        if (jobTypes.length > 0 && !selectedJobType) {
            setSelectedJobType(jobTypes[0].job_type)
        }
    }, [jobTypes, selectedJobType])

    const selectedJob = jobTypes.find((job) => job.job_type === selectedJobType)

    const handleStartJob = async () => {
        if (!selectedJob) return;

        setIsPending(true);
        try {
            // Call the server action
            const result = await startJob(selectedJob.job_type);

            // Handle the result
            if (result.success) {
                // You can use toast notifications if you have them set up
                toast?.success("Created");
                console.log("Job started successfully with ID:", result.data?.id);
            } else {
                toast?.error(result.error);
                console.error("Failed to start job:", result.error);
            }
        } catch (error) {
            console.error("Error starting job:", error);
            toast?.error("An unexpected error occurred");
        } finally {
            setIsPending(false);
        }
    }

    const handleCancel = async () => {
        if (!selectedJob) return;

        setIsPending(true);
        try {
            // Call the server action
            const result = await cancelJob(selectedJob.job_type);

            // Handle the result
            if (result.success) {
                toast?.success("Job cancelled successfully");
            } else {
                toast?.error(result.error);
            }
        } catch (error) {
            toast?.error("An unexpected error occurred");
        } finally {
            setIsPending(false);
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Start a Job</CardTitle>
                <CardDescription>Select a job type to begin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Select value={selectedJobType} onValueChange={setSelectedJobType} disabled={isPending}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a job" />
                    </SelectTrigger>
                    <SelectContent>
                        {jobTypes.map((job, index) => (
                            <SelectItem key={index} value={job.job_type}>
                                {job.job_name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {selectedJob ? (
                    <div className="p-3 bg-muted rounded-md">
                        <p className="font-medium">{selectedJob.job_name}</p>
                        <p className="text-xs text-muted-foreground mt-1">Type: {selectedJob.job_type}</p>
                        <p className="text-sm text-muted-foreground mt-2">{selectedJob.job_description}</p>
                    </div>
                ) : (
                    <div className="p-3 bg-muted rounded-md space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                        <Skeleton className="h-16 w-full mt-1" />
                    </div>
                )}
            </CardContent>
            <CardFooter className="grid grid-cols-2 w-full gap-2">
                <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={!selectedJobType || isPending}
                >
                    <XIcon className="h-4 w-4 mr-2" />
                    Cancel
                </Button>
                <Button
                    onClick={handleStartJob}
                    disabled={!selectedJobType || isPending}
                    className="bg-green-600 hover:bg-green-700"
                >
                    {isPending ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing
                        </>
                    ) : (
                        <>
                            <PlayIcon className="h-4 w-4 mr-2" />
                            Start Job
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    )
}