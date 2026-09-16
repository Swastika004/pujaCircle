import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addressApi } from '@/api/address.api';
import { CreateAddressRequest, UpdateAddressRequest } from '@/types/address.types';

export const addressKeys = {
  all: ['addresses'] as const,
  list: (userId?: string) => [...addressKeys.all, 'list', userId] as const,
};

export function useAddresses(userId?: string) {
  return useQuery({
    queryKey: addressKeys.list(userId),
    queryFn: () => addressApi.getAddresses(userId),
  });
}

export function useCreateAddressMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, userId }: { data: CreateAddressRequest; userId?: string }) =>
      addressApi.createAddress(data, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.all });
    },
  });
}

export function useUpdateAddressMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, userId }: { data: UpdateAddressRequest; userId?: string }) =>
      addressApi.updateAddress(data, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.all });
    },
  });
}

export function useDeleteAddressMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, userId }: { id: string; userId?: string }) =>
      addressApi.deleteAddress(id, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.all });
    },
  });
}
