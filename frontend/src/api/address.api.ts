import * as mockApi from '@/mocks/mock-api';
import { Address, CreateAddressRequest, UpdateAddressRequest, PincodeLookupResponse, PincodeLocation } from '@/types/address.types';
import { apiClient } from './client';
import { config } from '@/lib/config';
import { useAuthStore } from '@/store/auth.store';
import { logAppError, getUserFriendlyErrorMessage } from '@/lib/errorHandler';

export type { PincodeLocation, PincodeLookupResponse };

export const addressApi = {
  getAddresses: async (userId?: string): Promise<Address[]> => {
    try {
      const activeUserId = userId || useAuthStore.getState().user?.id || 'user-devotee-1';
      if (config.isMockEnabled) {
        const res = await mockApi.mockGetAddresses(activeUserId);
        return res.data || [];
      }
      const res = await apiClient.get('/addresses');
      return (res as any).data || res;
    } catch (error) {
      logAppError('addressApi.getAddresses', error, { userId });
      return [];
    }
  },

  createAddress: async (data: CreateAddressRequest, userId?: string): Promise<{ success: boolean; data?: Address; message: string }> => {
    try {
      const activeUserId = userId || useAuthStore.getState().user?.id || 'user-devotee-1';
      if (config.isMockEnabled) {
        return await mockApi.mockCreateAddress(activeUserId, data);
      }
      const res = await apiClient.post('/addresses', data);
      return res as any;
    } catch (error) {
      logAppError('addressApi.createAddress', error, { data });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to save address. Please verify the entered details.'),
      };
    }
  },

  updateAddress: async (data: UpdateAddressRequest, userId?: string): Promise<{ success: boolean; data?: Address; message: string }> => {
    try {
      const activeUserId = userId || useAuthStore.getState().user?.id || 'user-devotee-1';
      if (config.isMockEnabled) {
        return await mockApi.mockUpdateAddress(activeUserId, data);
      }
      const res = await apiClient.put(`/addresses/${data.id}`, data);
      return res as any;
    } catch (error) {
      logAppError('addressApi.updateAddress', error, { data });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to update address.'),
      };
    }
  },

  deleteAddress: async (id: string, userId?: string): Promise<{ success: boolean; message: string }> => {
    try {
      const activeUserId = userId || useAuthStore.getState().user?.id || 'user-devotee-1';
      if (config.isMockEnabled) {
        return await mockApi.mockDeleteAddress(id, activeUserId);
      }
      const res = await apiClient.delete(`/addresses/${id}`);
      return res as any;
    } catch (error) {
      logAppError('addressApi.deleteAddress', error, { id });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to delete address.'),
      };
    }
  },

  setDefaultAddress: async (addressId: string, userId?: string): Promise<{ success: boolean; message: string }> => {
    try {
      const activeUserId = userId || useAuthStore.getState().user?.id || 'user-devotee-1';
      if (config.isMockEnabled) {
        return await mockApi.mockSetDefaultAddress(activeUserId, addressId);
      }
      const res = await apiClient.patch(`/addresses/${addressId}/default`);
      return res as any;
    } catch (error) {
      logAppError('addressApi.setDefaultAddress', error, { addressId, userId });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to update default address.'),
      };
    }
  },

  /**
   * Real Postal PIN-Code Lookup API
   * Calls https://api.postalpincode.in/pincode/{PINCODE}
   * Resolves PIN code -> list of matching post office locations with city, district, state.
   * Falls back to mock data if offline or network error.
   */
  lookupPincode: async (pincode: string): Promise<PincodeLookupResponse> => {
    const cleanPin = pincode.trim().replace(/\D/g, '');

    if (cleanPin.length === 6) {
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${cleanPin}`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data[0]?.Status === 'Success' && Array.isArray(data[0]?.PostOffice)) {
            const locations: PincodeLocation[] = data[0].PostOffice.map((po: any) => ({
              postOffice: `${po.Name} Post Office`,
              locality: po.Name,
              villageTown: po.Name,
              city: po.District || po.Block || po.Circle || 'Unknown',
              district: po.District || 'Unknown',
              state: po.State || 'Unknown',
              country: po.Country || 'India',
            }));

            return {
              pincode: cleanPin,
              locations,
            };
          }
        }
      } catch (error) {
        logAppError('addressApi.lookupPincode.postalApiFallback', error, { cleanPin });
      }
    }

    // Fallback to internal dataset
    try {
      return await mockApi.mockLookupPincode(cleanPin);
    } catch (error) {
      logAppError('addressApi.lookupPincode.mockDbFallback', error, { cleanPin });
      return { pincode: cleanPin, locations: [] };
    }
  },
};
