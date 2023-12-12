import { useQuery, useMutation, type UseQueryResult, type UseMutationResult } from 'react-query';
import axios from 'axios';
import { type Team } from '@/server/api'; // Update the path as needed
import { queryClient } from '@/lib/query-client';
import { toast } from '@/components/ui/use-toast';

const API_DOMAIN = "localhost:8080" + '/teams';

const fetchTeams = async () => {
    const { data } = await axios.get<Team[]>(API_DOMAIN);
    return data;
};

const createTeam = async (newTeam: Team) => {
    const { data } = await axios.post<Team>(API_DOMAIN, newTeam);
    return data;
};

const updateTeam = async (updatedTeam: Team) => {
    const { data } = await axios.put<Team>(`${API_DOMAIN}/${updatedTeam.id}`, updatedTeam);
    return data;
};

const deleteTeam = async (id: string) => {
    await axios.delete(`${API_DOMAIN}/${id}`);
};

export function useFetchTeamById(id: string): UseQueryResult<Team, unknown> {
    return useQuery({ queryKey: ['teams', id], queryFn: fetchTeams });
}

export function useFetchTeams(): UseQueryResult<Team[], unknown> {
    return useQuery({ queryKey: ['teams'], queryFn: fetchTeams });
}

export function useCreateTeam(): UseMutationResult<Team, unknown, Team, unknown> {
    return useMutation({
        mutationFn: createTeam,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['teams'] });
        },
        onError: (error: Error) => {
            toast({
                title: "Error: Team not created",
                description: "Team could not be created. Please try again.",
                variant: "destructive"
            });
        },
    });
}

export function useUpdateTeam(): UseMutationResult<Team, unknown, Team, unknown> {
    return useMutation({
        mutationFn: updateTeam,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['teams'] });
        },
        onError: (error: Error) => {
            toast({
                title: "Error: Team not updated",
                description: "Team could not be updated. Please try again.",
                variant: "destructive"
            });
        },
    });
}

export function useDeleteTeam(): UseMutationResult<void, unknown, string, unknown> {
    return useMutation({
        mutationFn: deleteTeam,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['teams'] });
        },
        onError: (error: Error) => {
            toast({
                title: "Error: Team not deleted",
                description: "Team could not be deleted. Please try again.",
                variant: "destructive"
            });
        },
    });
}
