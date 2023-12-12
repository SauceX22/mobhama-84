import { useQuery, useMutation, type UseQueryResult, type UseMutationResult } from 'react-query';
import axios from 'axios';
import { type Project } from '@/server/api'; // Update the path as needed
import { queryClient } from '@/lib/query-client';
import { toast } from '@/components/ui/use-toast';
import { env } from '@/env.mjs';

const API_DOMAIN = "localhost:8080" + '/projects';

const fetchProjects = async () => {
    const { data } = await axios.get<Project[]>(API_DOMAIN);
    return data;
};

const createProject = async (newProject: Project) => {
    const { data } = await axios.post<Project>(API_DOMAIN, newProject);
    return data;
};

const updateProject = async (updatedProject: Project) => {
    const { data } = await axios.put<Project>(`${API_DOMAIN}/${updatedProject.id}`, updatedProject);
    return data;
};

const deleteProject = async (id: string) => {
    await axios.delete(`${API_DOMAIN}/${id}`);
};

export function useFetchProjectById(id: string): UseQueryResult<Project, unknown> {
    return useQuery({ queryKey: ['projects', id], queryFn: fetchProjects });
}

export function useFetchProjects(): UseQueryResult<Project[], unknown> {
    return useQuery({ queryKey: ['projects'], queryFn: fetchProjects });
}

export function useCreateProject(): UseMutationResult<Project, unknown, Project, unknown> {
    return useMutation({
        mutationFn: createProject,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
        onError: (error: Error) => {
            toast({
                title: "Error: Project not created",
                description: "Project could not be created. Please try again.",
                variant: "destructive"
            });
        },
    });
}

export function useUpdateProject(): UseMutationResult<Project, unknown, Project, unknown> {
    return useMutation({
        mutationFn: updateProject,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
        onError: (error: Error) => {
            toast({
                title: "Error: Project not updated",
                description: "Project could not be updated. Please try again.",
                variant: "destructive"
            });
        },
    });
}

export function useDeleteProject(): UseMutationResult<void, unknown, string, unknown> {
    return useMutation({
        mutationFn: deleteProject,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
        onError: (error: Error) => {
            toast({
                title: "Error: Project not deleted",
                description: "Project could not be deleted. Please try again.",
                variant: "destructive"
            });
        },
    });
}
