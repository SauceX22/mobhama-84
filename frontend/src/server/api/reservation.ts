"use client";

import { useQuery, useMutation, type UseQueryResult, type UseMutationResult } from 'react-query';
import { type Reservation } from '@/server/api'; // Update the path as needed
import { queryClient } from '@/lib/query-client';
import { toast } from '@/components/ui/use-toast';
import { env } from '@/env.mjs';

const API_DOMAIN = "localhost:8080" + '/reservations';

export function useFetchReservationById(id: string): UseQueryResult<Reservation, unknown> {
    return useQuery({ queryKey: ['reservations', id], queryFn: () => fetch(`${API_DOMAIN}/${id}`).then(res => res.json()) });
}

export function useFetchReservations({ projectId }: { projectId: string }): UseQueryResult<Reservation[], unknown> {
    return useQuery({
        queryKey: ['reservations', projectId],
        queryFn: () => fetch(`${API_DOMAIN}?projectId=${projectId}`).then(res => res.json()),
    });
}

export function useCreateReservation(): UseMutationResult<Reservation, unknown, Reservation, unknown> {
    return useMutation({
        mutationFn: (newReservation: Reservation) => fetch(API_DOMAIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReservation),
        }).then(res => res.json()),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['reservations'] });
        },
        onError: (error: Error) => {
            toast({
                title: "Error: Reservation not created",
                description: "Reservation could not be created. Please try again.",
                variant: "destructive"
            });
        },
    });
}

export function useUpdateReservation(): UseMutationResult<Reservation, unknown, Reservation, unknown> {
    return useMutation({
        mutationFn: (updatedReservation: Reservation) => fetch(`${API_DOMAIN}/${updatedReservation.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedReservation),
        }).then(res => res.json()),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['reservations'] });
        },
        onError: (error: Error) => {
            toast({
                title: "Error: Reservation not updated",
                description: "Reservation could not be updated. Please try again.",
                variant: "destructive"
            });
        },
    });
}

// Custom hook for deleting data
export function useDeleteReservation(): UseMutationResult<void, unknown, string, unknown> {
    return useMutation<void, Error, string, unknown>(async (id: string) => {
        const response = await fetch(`${API_DOMAIN}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers if needed
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete reservation');
        }
    });
}
