import * as mockApi from '@/mocks/mock-api';
import { Priest, PriestFilterParams } from '@/types/priest.types';
import { Booking } from '@/types/booking.types';
import { apiClient } from './client';
import { config } from '@/lib/config';
import { logAppError, getUserFriendlyErrorMessage } from '@/lib/errorHandler';

export const adminApi = {
  // Priest Management
  getAllPriests: async (params?: PriestFilterParams): Promise<Priest[]> => {
    try {
      if (config.isMockEnabled) {
        const res = await mockApi.mockGetPriests(params);
        return res.data || [];
      }
      const res = await apiClient.get('/admin/priests', { params });
      return (res as any).data || res;
    } catch (error) {
      logAppError('adminApi.getAllPriests', error, { params });
      return [];
    }
  },

  getPendingPriests: async (): Promise<Priest[]> => {
    try {
      if (config.isMockEnabled) {
        const res = await mockApi.mockAdminGetPriests();
        return res.data?.filter((p) => p.approvalStatus === 'PENDING') || [];
      }
      const res = await apiClient.get('/admin/priests/pending');
      return (res as any).data || res;
    } catch (error) {
      logAppError('adminApi.getPendingPriests', error);
      return [];
    }
  },

  approvePriest: async (priestId: string): Promise<{ success: boolean; message: string }> => {
    try {
      if (config.isMockEnabled) {
        return await mockApi.mockAdminApprovePriest(priestId);
      }
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
      if (config.isMockEnabled) {
        return await mockApi.mockAdminRejectPriest(priestId, reason || 'Incomplete documentation');
      }
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
      if (config.isMockEnabled) {
        return await mockApi.mockAdminBanPriest(priestId, reason || 'Policy violation');
      }
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
      if (config.isMockEnabled) {
        return await mockApi.mockAdminUnbanPriest(priestId);
      }
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
      if (config.isMockEnabled) {
        return await mockApi.mockAdminReopenPriestApplication(priestId);
      }
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
      if (config.isMockEnabled) {
        const res = await mockApi.mockAdminGetUsers();
        return res.data || [];
      }
      const res = await apiClient.get('/admin/users');
      return (res as any).data || res;
    } catch (error) {
      logAppError('adminApi.getAllUsers', error);
      return [];
    }
  },

  updateUserStatus: async (userId: string, status: string, reason?: string) => {
    try {
      if (config.isMockEnabled) {
        if (status === 'BANNED' || status === 'SUSPENDED') {
          return await mockApi.mockAdminBanUser(userId, reason || 'Administrative action');
        }
        return await mockApi.mockAdminUnbanUser(userId);
      }
      const res = await apiClient.patch(`/admin/users/${userId}/status`, { status, reason });
      return res as any;
    } catch (error) {
      logAppError('adminApi.updateUserStatus', error, { userId, status, reason });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to update user status.'),
      };
    }
  },

  // Platform Bookings
  getAllBookings: async (): Promise<Booking[]> => {
    try {
      if (config.isMockEnabled) {
        const res = await mockApi.mockGetBookings();
        return res.data || [];
      }
      const res = await apiClient.get('/admin/bookings');
      return (res as any).data || res;
    } catch (error) {
      logAppError('adminApi.getAllBookings', error);
      return [];
    }
  },

  getDashboardStats: async (): Promise<any> => {
    try {
      if (config.isMockEnabled) {
        return await mockApi.mockAdminGetDashboardStats();
      }
      const res = await apiClient.get('/admin/dashboard/stats');
      return (res as any).data || res;
    } catch (error) {
      logAppError('adminApi.getDashboardStats', error);
      return null;
    }
  },
};
