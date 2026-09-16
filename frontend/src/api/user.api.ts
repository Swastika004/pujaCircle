import { UserProfile, UpdateUserProfileRequest } from '@/types/user.types';
import { mockDb } from '@/mocks/data';
import { mockUpdateUserProfile, mockResetPassword } from '@/mocks/mock-api';
import { delay } from '@/mocks/delay';
import { apiClient } from './client';
import { config } from '@/lib/config';
import { useAuthStore } from '@/store/auth.store';
import { logAppError, getUserFriendlyErrorMessage } from '@/lib/errorHandler';

export const userApi = {
  getProfile: async (userId?: string): Promise<UserProfile | null> => {
    try {
      const activeUserId = userId || useAuthStore.getState().user?.id || 'user-devotee-1';
      if (config.isMockEnabled) {
        await delay(200);
        const user = mockDb.users.find((u) => u.id === activeUserId);
        if (!user) return null;
        return {
          id: user.id,
          name: user.name,
          phoneNumber: user.phoneNumber,
          email: user.email,
          role: user.role,
          accountStatus: user.accountStatus,
          status: user.accountStatus,
        };
      }
      const res = await apiClient.get('/users/profile');
      return (res as any).data || res;
    } catch (error) {
      logAppError('userApi.getProfile', error, { userId });
      return null;
    }
  },

  updateProfile: async (
    userId: string | undefined,
    data: UpdateUserProfileRequest
  ): Promise<{ success: boolean; data?: UserProfile; message: string }> => {
    try {
      const activeUserId = userId || useAuthStore.getState().user?.id || 'user-devotee-1';
      if (config.isMockEnabled) {
        const res = await mockUpdateUserProfile(activeUserId, {
          fullName: data.name || (data as any).fullName,
          email: data.email,
        });

        if (!res.success || !res.data) {
          return {
            success: false,
            message: res.message || 'Failed to update profile.',
          };
        }

        return {
          success: true,
          data: {
            id: res.data.id,
            name: res.data.name,
            phoneNumber: res.data.phoneNumber,
            email: res.data.email,
            role: res.data.role,
          },
          message: 'Profile updated successfully.',
        };
      }
      const res = await apiClient.put('/users/profile', data);
      return res as any;
    } catch (error) {
      logAppError('userApi.updateProfile', error, { userId, data });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to update profile. Please try again.'),
      };
    }
  },

  changePassword: async (data: {
    currentPassword?: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<{ success: boolean; message: string }> => {
    try {
      if (config.isMockEnabled) {
        return await mockResetPassword({
          otp: '123456',
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        });
      }
      const res = await apiClient.post('/users/change-password', data);
      return res as any;
    } catch (error) {
      logAppError('userApi.changePassword', error);
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to update password.'),
      };
    }
  },
};
