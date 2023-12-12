import { useQuery, useMutation, type UseQueryResult, type UseMutationResult } from 'react-query';
import axios from 'axios';
import { type Machine } from '@/server/api'; // Update the path as needed
import { queryClient } from '@/lib/query-client';
import { toast } from '@/components/ui/use-toast';
import { env } from '@/env.mjs';

const API_DOMAIN = "localhost:8080" + '/machines';

const fetchMachines = async () => {
    const { data } = await axios.get<Machine[]>(API_DOMAIN);
    return data;
};

const createMachine = async (newMachine: Machine) => {
    const { data } = await axios.post<Machine>(API_DOMAIN, newMachine);
    return data;
};

const updateMachine = async (updatedMachine: Machine) => {
    const { data } = await axios.put<Machine>(`${API_DOMAIN}/${updatedMachine.id}`, updatedMachine);
    return data;
};

const deleteMachine = async (id: string) => {
    await axios.delete(`${API_DOMAIN}/${id}`);
};

export function useFetchMachineById(id: string): UseQueryResult<Machine, unknown> {
    return useQuery({ queryKey: ['machines', id], queryFn: fetchMachines });
}

export function useFetchMachines(): UseQueryResult<Machine[], unknown> {
    return useQuery({ queryKey: ['machines'], queryFn: fetchMachines });
}

export function useCreateMachine(): UseMutationResult<Machine, unknown, Machine, unknown> {
    return useMutation({
        mutationFn: createMachine,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['machines'] });
        },
        onError: (error: Error) => {
            toast({
                title: "Error: Machine not created",
                description: "Machine could not be created. Please try again.",
                variant: "destructive"
            });
        },
    });
}

export function useUpdateMachine(): UseMutationResult<Machine, unknown, Machine, unknown> {
    return useMutation({
        mutationFn: updateMachine,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['machines'] });
        },
        onError: (error: Error) => {
            toast({
                title: "Error: Machine not updated",
                description: "Machine could not be updated. Please try again.",
                variant: "destructive"
            });
        },
    });
}

export function useDeleteMachine(): UseMutationResult<void, unknown, string, unknown> {
    return useMutation({
        mutationFn: deleteMachine,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['machines'] });
        },
        onError: (error: Error) => {
            toast({
                title: "Error: Machine not deleted",
                description: "Machine could not be deleted. Please try again.",
                variant: "destructive"
            });
        },
    });
}
