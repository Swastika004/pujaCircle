import {
  mockLogin,
  mockLogout,
  mockSendPhoneOtp,
  mockVerifyPhoneOtp,
  mockSendEmailOtp,
  mockVerifyEmailOtp,
  mockRegisterUser,
  mockRegisterPriest,
} from '@/mocks/mock-api';
import {
  LoginCredentials,
  AuthResponse,
  AuthUser,
  PhoneOtpRequest,
  VerifyPhoneOtpRequest,
  EmailOtpRequest,
  VerifyEmailOtpRequest,
  RegisterUserRequest,
  RegisterPriestRequest,
} from '@/types/auth.types';
import { apiClient } from './client';
import { config } from '@/lib/config';
import { logAppError, getUserFriendlyErrorMessage } from '@/lib/errorHandler';

/**
 * Authentication API (Frontend Layer)
 * Supports transparent switching between Mock API and live Backend via config.isMockEnabled
 */
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      if (config.isMockEnabled) {
        return await mockLogin(credentials);
      }
      const res = await apiClient.post('/auth/login', credentials);
      return res as any;
    } catch (error) {
      logAppError('authApi.login', error, { identifier: credentials.identifier || credentials.phoneNumber || credentials.email });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Sign in failed. Please verify your credentials and try again.'),
      };
    }
  },

  registerUser: async (data: RegisterUserRequest): Promise<AuthResponse> => {
    try {
      if (config.isMockEnabled) {
        return await mockRegisterUser(data);
      }
      const res = await apiClient.post('/auth/register/user', data);
      return res as any;
    } catch (error) {
      logAppError('authApi.registerUser', error, { phone: data.phoneNumber });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Devotee registration failed. Please try again.'),
      };
    }
  },

  registerPriest: async (data: RegisterPriestRequest): Promise<AuthResponse> => {
    try {
      if (config.isMockEnabled) {
        return await mockRegisterPriest(data);
      }
      const res = await apiClient.post('/auth/register/priest', data);
      return res as any;
    } catch (error) {
      logAppError('authApi.registerPriest', error, { phone: data.phoneNumber });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Priest application submission failed. Please try again.'),
      };
    }
  },

  getMe: async (): Promise<{ success: boolean; data?: { user: AuthUser }; message?: string }> => {
    try {
      if (config.isMockEnabled) {
        // In mock mode, session is persisted in auth store
        return { success: true };
      }
      const res = await apiClient.get('/auth/me');
      return res as any;
    } catch (error) {
      logAppError('authApi.getMe', error);
      return { success: false, message: 'Session expired.' };
    }
  },

  logout: async (): Promise<{ success: boolean; message: string }> => {
    try {
      if (config.isMockEnabled) {
        return await mockLogout();
      }
      const res = await apiClient.post('/auth/logout');
      return res as any;
    } catch (error) {
      logAppError('authApi.logout', error);
      return { success: true, message: 'Logged out successfully.' };
    }
  },

  sendPhoneOtp: async (data: PhoneOtpRequest): Promise<{ success: boolean; message: string }> => {
    try {
      if (config.isMockEnabled) {
        return await mockSendPhoneOtp(data);
      }
      const res = await apiClient.post('/auth/otp/send-phone', data);
      return res as any;
    } catch (error) {
      logAppError('authApi.sendPhoneOtp', error, { phoneNumber: data.phoneNumber });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to dispatch verification code. Please try again.'),
      };
    }
  },

  verifyPhoneOtp: async (data: VerifyPhoneOtpRequest): Promise<{ success: boolean; message: string }> => {
    try {
      if (config.isMockEnabled) {
        return await mockVerifyPhoneOtp(data);
      }
      const res = await apiClient.post('/auth/otp/verify-phone', data);
      return res as any;
    } catch (error) {
      logAppError('authApi.verifyPhoneOtp', error, { phoneNumber: data.phoneNumber });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Verification failed. Please check the code and try again.'),
      };
    }
  },

  sendEmailOtp: async (data: EmailOtpRequest): Promise<{ success: boolean; message: string }> => {
    try {
      if (config.isMockEnabled) {
        return await mockSendEmailOtp(data);
      }
      const res = await apiClient.post('/auth/otp/send-email', data);
      return res as any;
    } catch (error) {
      logAppError('authApi.sendEmailOtp', error, { email: data.email });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to send password reset code. Please try again.'),
      };
    }
  },

  verifyEmailOtp: async (data: VerifyEmailOtpRequest): Promise<{ success: boolean; message: string }> => {
    try {
      if (config.isMockEnabled) {
        return await mockVerifyEmailOtp(data);
      }
      const res = await apiClient.post('/auth/otp/verify-email', data);
      return res as any;
    } catch (error) {
      logAppError('authApi.verifyEmailOtp', error, { email: data.email });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Verification failed. Please check the code and try again.'),
      };
    }
  },
};
