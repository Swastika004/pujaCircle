import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { priestApi } from '@/api/priest.api';
import { PriestFilterParams, Priest } from '@/types/priest.types';

export const priestKeys = {
  all: ['priests'] as const,
  lists: () => [...priestKeys.all, 'list'] as const,
  list: (params?: PriestFilterParams) => [...priestKeys.lists(), params] as const,
  detail: (id: string) => [...priestKeys.all, 'detail', id] as const,
  myProfile: () => [...priestKeys.all, 'my-profile'] as const,
  services: (priestId?: string) => [...priestKeys.all, 'services', priestId] as const,
  slots: (priestId?: string, date?: string) => [...priestKeys.all, 'slots', priestId, date] as const,
};

export function usePriests(params?: PriestFilterParams) {
  return useQuery({
    queryKey: priestKeys.list(params),
    queryFn: () => priestApi.getPriests(params),
  });
}

export function usePriestDetails(id: string) {
  return useQuery({
    queryKey: priestKeys.detail(id),
    queryFn: () => priestApi.getPriestById(id),
    enabled: !!id,
  });
}

export function useMyPriestProfile() {
  return useQuery({
    queryKey: priestKeys.myProfile(),
    queryFn: () => priestApi.getMyPriestProfile(),
  });
}

export function usePriestServices(priestId?: string) {
  return useQuery({
    queryKey: priestKeys.services(priestId),
    queryFn: () => priestApi.getPriestServices(priestId),
  });
}

export function usePriestSlots(priestId?: string, date?: string) {
  return useQuery({
    queryKey: priestKeys.slots(priestId, date),
    queryFn: () => priestApi.getPriestSlots(priestId, date),
  });
}

export function useCreateSlotMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ priestId, data }: { priestId?: string; data: { slotDate?: string; date?: string; startTime: string; endTime: string } }) =>
      priestApi.createAvailabilitySlot(priestId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: priestKeys.all });
    },
  });
}

export function useDeleteSlotMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ slotId, priestId }: { slotId: string; priestId?: string }) =>
      priestApi.deleteAvailabilitySlot(slotId, priestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: priestKeys.all });
    },
  });
}

export function useUpdatePriestProfileMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Priest> }) =>
      priestApi.updatePriestProfile(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: priestKeys.all });
      queryClient.invalidateQueries({ queryKey: priestKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: priestKeys.myProfile() });
    },
  });
}
