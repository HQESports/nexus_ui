'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from "sonner";
import { getTeam, Team } from '@/app/actions/teams';
import TeamForm from './teams-form';

export default function TeamsFormPage() {
    const router = useRouter();
    const params = useParams();
    const teamId = params.id as string;

    const [isLoading, setIsLoading] = useState(false);
    const [team, setTeam] = useState<Team | undefined>(undefined);

    // Determine if we're in update mode based on the presence of an ID
    // If we're at /teams/new, this will be false
    const isUpdateMode = Boolean(teamId) && teamId !== 'new';

    useEffect(() => {
        // If we have a team ID, fetch the team data
        if (isUpdateMode) {
            const fetchTeam = async () => {
                setIsLoading(true);
                try {
                    const result = await getTeam(teamId);
                    if (result.success && result.data) {
                        setTeam(result.data);
                    } else {
                        toast.error('Error', {
                            description: result.error || 'Failed to load team data',
                        });
                        // Redirect back to teams list if team not found
                        router.push('/teams');
                    }
                } catch (error) {
                    toast.error('Error', {
                        description: 'An unexpected error occurred while loading team data',
                    });
                    router.push('/teams');
                } finally {
                    setIsLoading(false);
                }
            };

            fetchTeam();
        }
    }, [teamId, router, isUpdateMode]);

    const handleSuccess = () => {
        // Redirect to teams list on success
        router.push('/teams');
    };

    if (isUpdateMode && isLoading) {
        return (
            <div className="w-full flex justify-center items-center min-h-[300px]">
                <div className="text-center">
                    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p>Loading team data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full p-6">
            <h1 className="text-3xl font-bold mb-6">
                {isUpdateMode ? 'Edit Team' : 'Create New Team'}
            </h1>
            <TeamForm
                mode={isUpdateMode ? 'update' : 'create'}
                initialTeam={team}
                onSuccess={handleSuccess}
            />
        </div>
    );
}