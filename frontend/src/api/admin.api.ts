import { Priest, PriestFilterParams } from '@/types/priest.types';
import { Booking } from '@/types/booking.types';
import { apiClient } from './client';
import { logAppError, getUserFriendlyErrorMessage } from '@/lib/errorHandler';

/**
 * Admin API (Frontend Layer)
 * Connected directly to live backend (/api/v1/admin)
 */
export const adminApi = {
  // Priest Management
  getAllPriests: async (params?: PriestFilterParams): Promise<Priest[]> => {
    try {
      const res = await apiClient.get('/admin/priests', { params });
      return (res as any).data || res;
    } catch (error) {
      logAppError('adminApi.getAllPriests', error, { params });
      return [];
    }
  },

  getPendingPriests: async (): Promise<Priest[]> => {
    try {
      const res = await apiClient.get('/admin/priests/pending');
      return (res as any).data || res;
    } catch (error) {
      logAppError('adminApi.getPendingPriests', error);
      return [];
    }
  },

  approvePriest: async (priestId: string): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await apiClient.post(`/admin/priests/${priestId}/approve`);
      return res as any;
    } catch (error) {
      logAppError('adminApi.approvePriest', error, { priestId });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to approve priest application.'),
      };
    }
  },

  rejectPriest: async (priestId: string, reason?: string): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await apiClient.post(`/admin/priests/${priestId}/reject`, { reason });
      return res as any;
    } catch (error) {
      logAppError('adminApi.rejectPriest', error, { priestId, reason });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to reject priest application.'),
      };
    }
  },

  banPriest: async (priestId: string, reason?: string): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await apiClient.post(`/admin/priests/${priestId}/ban`, { reason });
      return res as any;
    } catch (error) {
      logAppError('adminApi.banPriest', error, { priestId, reason });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to suspend priest account.'),
      };
    }
  },

  reactivatePriest: async (priestId: string): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await apiClient.post(`/admin/priests/${priestId}/unban`);
      return res as any;
    } catch (error) {
      logAppError('adminApi.reactivatePriest', error, { priestId });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to reactivate priest account.'),
      };
    }
  },

  unbanPriest: async (priestId: string): Promise<{ success: boolean; message: string }> => {
    return adminApi.reactivatePriest(priestId);
  },

  reopenPriestApplication: async (priestId: string): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await apiClient.post(`/admin/priests/${priestId}/reopen`);
      return res as any;
    } catch (error) {
      logAppError('adminApi.reopenPriestApplication', error, { priestId });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to reopen priest application.'),
      };
    }
  },

  // Devotee / User Management
  getAllUsers: async (): Promise<any[]> => {
    try {
      const res = await apiClient.get('/admin/users');
      return (res as any).data || res;
    } catch (error) {
      logAppError('adminApi.getAllUsers', error);
      return [];
    }
  },

  suspendUser: async (userId: string, reason?: string) => {
    try {
      const res = await apiClient.post(`/admin/users/${userId}/suspend`, { reason });
      return res as any;
    } catch (error) {
      logAppError('adminApi.suspendUser', error, { userId, reason });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to suspend user.'),
      };
    }
  },

  unsuspendUser: async (userId: string) => {
    try {
      const res = await apiClient.post(`/admin/users/${userId}/unsuspend`);
      return res as any;
    } catch (error) {
      logAppError('adminApi.unsuspendUser', error, { userId });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to unsuspend user.'),
      };
    }
  },

  // Platform Bookings
  getAllBookings: async (): Promise<Booking[]> => {
    try {
      const res = await apiClient.get('/admin/bookings');
      return (res as any).data || res;
    } catch (error) {
      logAppError('adminApi.getAllBookings', error);
      return [];
    }
  },

  getDashboardStats: async (): Promise<any> => {
    try {
      const res = await apiClient.get('/admin/dashboard/stats');
      return (res as any).data || res;
    } catch (error) {
      logAppError('adminApi.getDashboardStats', error);
      return null;
    }
  },
};
