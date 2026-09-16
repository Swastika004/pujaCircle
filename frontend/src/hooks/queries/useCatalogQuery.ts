import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { catalogApi } from '@/api/catalog.api';
import { PujaCatalogEntry } from '@/types/catalog.types';

export const catalogKeys = {
  all: ['catalog'] as const,
  list: (category?: string, query?: string) => [...catalogKeys.all, 'list', { category, query }] as const,
  detail: (id: string) => [...catalogKeys.all, 'detail', id] as const,
};

export function usePujaCatalog(category?: string, query?: string) {
  return useQuery({
    queryKey: catalogKeys.list(category, query),
    queryFn: () => catalogApi.getCatalog(category, query),
  });
}

export function useCatalogEntryDetails(id: string) {
  return useQuery({
    queryKey: catalogKeys.detail(id),
    queryFn: () => catalogApi.getCatalogEntryById(id),
    enabled: !!id,
  });
}

export function useCreateCatalogEntryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<PujaCatalogEntry, 'id'>) => catalogApi.createCatalogEntry(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: catalogKeys.all });
    },
  });
}

export function useUpdateCatalogEntryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<PujaCatalogEntry> }) =>
      catalogApi.updateCatalogEntry(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: catalogKeys.all });
      queryClient.invalidateQueries({ queryKey: catalogKeys.detail(variables.id) });
    },
  });
}

export function useDeleteCatalogEntryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => catalogApi.deleteCatalogEntry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: catalogKeys.all });
    },
  });
}
