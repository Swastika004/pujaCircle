import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingApi } from '@/api/booking.api';
import { CreateBookingRequest, CancelBookingRequest, SubmitRatingRequest } from '@/types/booking.types';

export const bookingKeys = {
  all: ['bookings'] as const,
  lists: () => [...bookingKeys.all, 'list'] as const,
  list: (userId?: string, priestId?: string) => [...bookingKeys.lists(), { userId, priestId }] as const,
  detail: (id: string) => [...bookingKeys.all, 'detail', id] as const,
};

export function useDevoteeBookings(userId?: string) {
  return useQuery({
    queryKey: bookingKeys.list(userId, undefined),
    queryFn: () => bookingApi.getBookings(userId),
  });
}

export function usePriestBookings(priestId?: string) {
  return useQuery({
    queryKey: bookingKeys.list(undefined, priestId),
    queryFn: () => bookingApi.getPriestBookings(priestId),
  });
}

export function useBookingDetails(id: string) {
  return useQuery({
    queryKey: bookingKeys.detail(id),
    queryFn: () => bookingApi.getBookingById(id),
    enabled: !!id,
  });
}

export function useCreateBookingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, userId }: { data: CreateBookingRequest; userId?: string }) =>
      bookingApi.createBooking(data, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.all });
    },
  });
}

export function useAcceptBookingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ bookingId, priestId }: { bookingId: string; priestId?: string }) =>
      bookingApi.acceptBooking(bookingId, priestId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.all });
      queryClient.invalidateQueries({ queryKey: bookingKeys.detail(variables.bookingId) });
    },
  });
}

export function useRejectBookingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ bookingId, priestId, reason }: { bookingId: string; priestId?: string; reason?: string }) =>
      bookingApi.rejectBooking(bookingId, priestId, reason),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.all });
      queryClient.invalidateQueries({ queryKey: bookingKeys.detail(variables.bookingId) });
    },
  });
}

export function useCancelBookingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CancelBookingRequest & { userId?: string }) =>
      bookingApi.cancelBooking(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.all });
      queryClient.invalidateQueries({ queryKey: bookingKeys.detail(variables.bookingId) });
    },
  });
}

export function useCompleteBookingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ bookingId, priestId, completionCode }: { bookingId: string; priestId?: string; completionCode?: string }) =>
      bookingApi.completeBooking(bookingId, priestId, completionCode),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.all });
      queryClient.invalidateQueries({ queryKey: bookingKeys.detail(variables.bookingId) });
    },
  });
}

export function useSubmitRatingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, data }: { userId?: string; data: SubmitRatingRequest }) =>
      bookingApi.submitRating(userId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.all });
      queryClient.invalidateQueries({ queryKey: bookingKeys.detail(variables.data.bookingId) });
    },
  });
}
