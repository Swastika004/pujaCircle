import * as mockApi from '@/mocks/mock-api';
import {
  Priest,
  PriestFilterParams,
  PriestSlot,
  Ritual,
  PriestService,
} from '@/types/priest.types';
import { PincodeLookupResponse } from '@/types/address.types';
import { apiClient } from './client';
import { config } from '@/lib/config';
import { useAuthStore } from '@/store/auth.store';
import { logAppError, getUserFriendlyErrorMessage } from '@/lib/errorHandler';

export const priestApi = {
  // Helper to resolve current authenticated priest's ID in mock mode
  resolveCurrentPriestId: (): string => {
    const user = useAuthStore.getState().user;
    return mockApi.resolvePriestId(user);
  },

  // Public Approved Priests
  getPriests: async (params?: PriestFilterParams): Promise<Priest[]> => {
    try {
      if (config.isMockEnabled) {
        const res = await mockApi.mockGetPriests(params);
        return res.data || [];
      }
      const res = await apiClient.get('/priests', { params });
      return (res as any).data || res;
    } catch (error) {
      logAppError('priestApi.getPriests', error, { params });
      return [];
    }
  },

  getPriestById: async (id: string): Promise<Priest | undefined> => {
    try {
      if (config.isMockEnabled) {
        const res = await mockApi.mockGetPriestById(id);
        return res.data;
      }
      const res = await apiClient.get(`/priests/${id}`);
      return (res as any).data || res;
    } catch (error) {
      logAppError('priestApi.getPriestById', error, { id });
      return undefined;
    }
  },

  getMyPriestProfile: async (): Promise<Priest | undefined> => {
    const priestId = priestApi.resolveCurrentPriestId();
    return priestApi.getPriestById(priestId);
  },

  updatePriestProfile: async (id: string, updates: Partial<Priest>) => {
    try {
      if (config.isMockEnabled) {
        return await mockApi.mockUpdatePriestProfile(id, updates);
      }
      const res = await apiClient.put(`/priests/${id}`, updates);
      return res as any;
    } catch (error) {
      logAppError('priestApi.updatePriestProfile', error, { id });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to update priest profile. Please try again.'),
      };
    }
  },

  // Services & Pricing Catalog
  getPriestServices: async (priestId?: string): Promise<PriestService[]> => {
    try {
      const activeId = priestId || priestApi.resolveCurrentPriestId();
      if (config.isMockEnabled) {
        const res = await mockApi.mockGetPriestServices(activeId);
        return res.data || [];
      }
      const res = await apiClient.get(`/priests/${activeId}/services`);
      return (res as any).data || res;
    } catch (error) {
      logAppError('priestApi.getPriestServices', error, { priestId });
      return [];
    }
  },

  getMyServices: async (): Promise<PriestService[]> => {
    return priestApi.getPriestServices();
  },

  createPriestService: async (priestId: string | undefined, data: { serviceName: string; price: number }) => {
    try {
      const activeId = priestId || priestApi.resolveCurrentPriestId();
      if (config.isMockEnabled) {
        return await mockApi.mockCreatePriestService(activeId, data);
      }
      const res = await apiClient.post(`/priests/${activeId}/services`, data);
      return res as any;
    } catch (error) {
      logAppError('priestApi.createPriestService', error, { priestId, data });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to create service. Please check the values and try again.'),
      };
    }
  },

  updatePriestService: async (
    serviceId: string,
    priestId: string | undefined,
    data: { serviceName?: string; price?: number; isActive?: boolean }
  ) => {
    try {
      const activeId = priestId || priestApi.resolveCurrentPriestId();
      if (config.isMockEnabled) {
        return await mockApi.mockUpdatePriestService(serviceId, activeId, data);
      }
      const res = await apiClient.put(`/priests/${activeId}/services/${serviceId}`, data);
      return res as any;
    } catch (error) {
      logAppError('priestApi.updatePriestService', error, { serviceId, priestId });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to update service.'),
      };
    }
  },

  deletePriestService: async (serviceId: string, priestId?: string) => {
    try {
      const activeId = priestId || priestApi.resolveCurrentPriestId();
      if (config.isMockEnabled) {
        return await mockApi.mockDeletePriestService(serviceId, activeId);
      }
      const res = await apiClient.delete(`/priests/${activeId}/services/${serviceId}`);
      return res as any;
    } catch (error) {
      logAppError('priestApi.deletePriestService', error, { serviceId, priestId });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to remove service.'),
      };
    }
  },

  togglePriestService: async (serviceId: string, priestId?: string) => {
    try {
      const activeId = priestId || priestApi.resolveCurrentPriestId();
      if (config.isMockEnabled) {
        return await mockApi.mockTogglePriestService(serviceId, activeId);
      }
      const res = await apiClient.patch(`/priests/${activeId}/services/${serviceId}/toggle`);
      return res as any;
    } catch (error) {
      logAppError('priestApi.togglePriestService', error, { serviceId, priestId });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to toggle service status.'),
      };
    }
  },

  // Direct Date-Based Availability Slots
  getPriestSlots: async (priestId?: string, date?: string): Promise<PriestSlot[]> => {
    try {
      const activeId = priestId || priestApi.resolveCurrentPriestId();
      if (config.isMockEnabled) {
        const res = await mockApi.mockGetPriestSlots(activeId, date);
        return res.data || [];
      }
      const res = await apiClient.get(`/priests/${activeId}/slots`, { params: { date } });
      return (res as any).data || res;
    } catch (error) {
      logAppError('priestApi.getPriestSlots', error, { priestId, date });
      return [];
    }
  },

  getMySlots: async (date?: string): Promise<PriestSlot[]> => {
    return priestApi.getPriestSlots(undefined, date);
  },

  getAvailableSlotsForDate: async (priestId: string, date: string): Promise<PriestSlot[]> => {
    try {
      if (config.isMockEnabled) {
        const res = await mockApi.mockGetAvailableSlotsForDate(priestId, date);
        return res.data || [];
      }
      const res = await apiClient.get(`/priests/${priestId}/slots/available`, { params: { date } });
      return (res as any).data || res;
    } catch (error) {
      logAppError('priestApi.getAvailableSlotsForDate', error, { priestId, date });
      return [];
    }
  },

  createAvailabilitySlot: async (
    priestId: string | undefined,
    payload: { slotDate?: string; date?: string; startTime: string; endTime: string }
  ) => {
    try {
      const activeId = priestId || priestApi.resolveCurrentPriestId();
      if (config.isMockEnabled) {
        return await mockApi.mockCreateAvailabilitySlot(activeId, payload);
      }
      const res = await apiClient.post(`/priests/${activeId}/slots`, payload);
      return res as any;
    } catch (error) {
      logAppError('priestApi.createAvailabilitySlot', error, { priestId, payload });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to create availability slot.'),
      };
    }
  },

  updateAvailabilitySlot: async (
    slotId: string,
    priestId: string | undefined,
    payload: { slotDate?: string; date?: string; startTime?: string; endTime?: string }
  ) => {
    try {
      const activeId = priestId || priestApi.resolveCurrentPriestId();
      if (config.isMockEnabled) {
        return await mockApi.mockUpdateAvailabilitySlot(slotId, activeId, payload);
      }
      const res = await apiClient.put(`/priests/${activeId}/slots/${slotId}`, payload);
      return res as any;
    } catch (error) {
      logAppError('priestApi.updateAvailabilitySlot', error, { slotId, priestId, payload });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to update availability slot.'),
      };
    }
  },

  deleteAvailabilitySlot: async (slotId: string, priestId?: string) => {
    try {
      const activeId = priestId || priestApi.resolveCurrentPriestId();
      if (config.isMockEnabled) {
        return await mockApi.mockDeleteAvailabilitySlot(slotId, activeId);
      }
      const res = await apiClient.delete(`/priests/${activeId}/slots/${slotId}`);
      return res as any;
    } catch (error) {
      logAppError('priestApi.deleteAvailabilitySlot', error, { slotId, priestId });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to remove availability slot.'),
      };
    }
  },

  createPriestSlot: async (priestId: string, data: { date: string; startTime: string; endTime: string }) => {
    return priestApi.createAvailabilitySlot(priestId, { slotDate: data.date, ...data });
  },

  getRituals: async (): Promise<Ritual[]> => {
    try {
      if (config.isMockEnabled) {
        const res = await mockApi.mockGetRituals();
        return res.data || [];
      }
      const res = await apiClient.get('/rituals');
      return (res as any).data || res;
    } catch (error) {
      logAppError('priestApi.getRituals', error);
      return [];
    }
  },

  // Admin Management APIs
  getAllPriests: async (params?: PriestFilterParams): Promise<Priest[]> => {
    try {
      if (config.isMockEnabled) {
        const res = await mockApi.mockGetPriests(params ? { ...params, status: 'ALL' } : { status: 'ALL' });
        return res.data || [];
      }
      const res = await apiClient.get('/admin/priests', { params });
      return (res as any).data || res;
    } catch (error) {
      logAppError('priestApi.getAllPriests', error, { params });
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
      logAppError('priestApi.getPendingPriests', error);
      return [];
    }
  },

  approvePriest: async (priestId: string) => {
    try {
      if (config.isMockEnabled) {
        return await mockApi.mockAdminApprovePriest(priestId);
      }
      const res = await apiClient.post(`/admin/priests/${priestId}/approve`);
      return res as any;
    } catch (error) {
      logAppError('priestApi.approvePriest', error, { priestId });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to approve priest.'),
      };
    }
  },

  rejectPriest: async (priestId: string, reason: string = 'Application incomplete') => {
    try {
      if (config.isMockEnabled) {
        return await mockApi.mockAdminRejectPriest(priestId, reason);
      }
      const res = await apiClient.post(`/admin/priests/${priestId}/reject`, { reason });
      return res as any;
    } catch (error) {
      logAppError('priestApi.rejectPriest', error, { priestId });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to reject priest.'),
      };
    }
  },

  banPriest: async (priestId: string, reason: string = 'Policy violation') => {
    try {
      if (config.isMockEnabled) {
        return await mockApi.mockAdminBanPriest(priestId, reason);
      }
      const res = await apiClient.post(`/admin/priests/${priestId}/ban`, { reason });
      return res as any;
    } catch (error) {
      logAppError('priestApi.banPriest', error, { priestId });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to ban priest.'),
      };
    }
  },

  reactivatePriest: async (priestId: string) => {
    try {
      if (config.isMockEnabled) {
        return await mockApi.mockAdminUnbanPriest(priestId);
      }
      const res = await apiClient.post(`/admin/priests/${priestId}/unban`);
      return res as any;
    } catch (error) {
      logAppError('priestApi.reactivatePriest', error, { priestId });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to reactivate priest.'),
      };
    }
  },

  lookupPincode: async (pincode: string): Promise<PincodeLookupResponse> => {
    try {
      if (config.isMockEnabled) {
        return await mockApi.mockLookupPincode(pincode);
      }
      const res = await apiClient.get(`/geo/pincode/${pincode}`);
      return (res as any).data || res;
    } catch (error) {
      logAppError('priestApi.lookupPincode', error, { pincode });
      return { pincode, locations: [] };
    }
  },
};
