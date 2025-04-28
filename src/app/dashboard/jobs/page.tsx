import React from 'react';
import { getJobs, getJobTypes, Job } from '@/app/actions/job';
import { JobCard } from '@/components/job-card';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { JobTypesCard } from '@/components/job-types-card';
import { JobSelector } from '@/components/job-selector';
import StatusCard from '@/components/server-status-card';
import ConditionalRender from '@/components/conditional-render';
import JobsView from '@/components/jobs-view';

export default async function JobDashboard() {
    // Sample placeholder data for grid items
    const { success: jobSuccess, data: jobs, error: jobError } = await getJobs();

    let { success, data: jobTypes, error } = await getJobTypes()

    return (
        <div className="p-6">
            {/* Dashboard Title */}
            <h1 className="text-3xl font-bold mb-6">Job Dashboard</h1>
            <div className='grid grid-cols-2 gap-4 mb-6'>

                <ConditionalRender success={false} error={undefined}>
                    <JobSelector
                        jobTypes={jobTypes ? jobTypes : []}
                    />
                    <StatusCard />
                </ConditionalRender>
            </div>

            {/* Grid Layout with 3 columns */}
            <h1 className="text-2xl font-bold mb-6">Jobs</h1>
            <ConditionalRender success={true} error={undefined}>
                <JobsView jobs={jobs ? jobs : []} />
            </ConditionalRender>

        </div>
    );
};