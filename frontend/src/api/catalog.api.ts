import { apiClient } from './client';
import { PujaCatalogEntry } from '@/types/catalog.types';
import { logAppError, getUserFriendlyErrorMessage } from '@/lib/errorHandler';

export const catalogApi = {
  getCatalog: async (category?: string, query?: string): Promise<PujaCatalogEntry[]> => {
    try {
      const res = await apiClient.get('/catalog', { params: { category, query } });
      return (res as any).data || res;
    } catch (error) {
      logAppError('catalogApi.getCatalog', error, { category, query });
      return [];
    }
  },

  getCatalogEntryById: async (id: string): Promise<PujaCatalogEntry | null> => {
    try {
      const res = await apiClient.get(`/catalog/${id}`);
      return (res as any).data || res;
    } catch (error) {
      logAppError('catalogApi.getCatalogEntryById', error, { id });
      return null;
    }
  },

  createCatalogEntry: async (
    data: Omit<PujaCatalogEntry, 'id'>
  ): Promise<{ success: boolean; data?: PujaCatalogEntry; message: string }> => {
    try {
      const res = await apiClient.post('/catalog', data);
      return res as any;
    } catch (error) {
      logAppError('catalogApi.createCatalogEntry', error, { data });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to create catalog entry.'),
      };
    }
  },

  updateCatalogEntry: async (
    id: string,
    data: Partial<PujaCatalogEntry>
  ): Promise<{ success: boolean; data?: PujaCatalogEntry; message: string }> => {
    try {
      const res = await apiClient.put(`/catalog/${id}`, data);
      return res as any;
    } catch (error) {
      logAppError('catalogApi.updateCatalogEntry', error, { id, data });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to update catalog entry.'),
      };
    }
  },

  deleteCatalogEntry: async (id: string): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await apiClient.delete(`/catalog/${id}`);
      return res as any;
    } catch (error) {
      logAppError('catalogApi.deleteCatalogEntry', error, { id });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to delete catalog entry.'),
      };
    }
  },
};
