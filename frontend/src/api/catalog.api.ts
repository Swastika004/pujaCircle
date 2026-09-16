import { apiClient } from './client';
import { config } from '@/lib/config';
import { mockDb } from '@/mocks/data';
import { delay } from '@/mocks/delay';
import { PujaCatalogEntry } from '@/types/catalog.types';
import { logAppError, getUserFriendlyErrorMessage } from '@/lib/errorHandler';

export const catalogApi = {
  getCatalog: async (category?: string, query?: string): Promise<PujaCatalogEntry[]> => {
    try {
      if (config.isMockEnabled) {
        await delay(150);
        let list = [...mockDb.pujaCatalog];
        if (category && category !== 'ALL') {
          list = list.filter((e) => e.category === category);
        }
        if (query) {
          const q = query.toLowerCase().trim();
          list = list.filter(
            (e) =>
              e.name.toLowerCase().includes(q) ||
              e.deity.toLowerCase().includes(q) ||
              e.intentTags.some((t) => t.toLowerCase().includes(q))
          );
        }
        return JSON.parse(JSON.stringify(list));
      }
      const res = await apiClient.get('/catalog', { params: { category, query } });
      return (res as any).data || res;
    } catch (error) {
      logAppError('catalogApi.getCatalog', error, { category, query });
      return [];
    }
  },

  getCatalogEntryById: async (id: string): Promise<PujaCatalogEntry | null> => {
    try {
      if (config.isMockEnabled) {
        await delay(100);
        const entry = mockDb.pujaCatalog.find((e) => e.id === id);
        return entry ? JSON.parse(JSON.stringify(entry)) : null;
      }
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
      if (config.isMockEnabled) {
        await delay(250);
        const newEntry: PujaCatalogEntry = {
          ...data,
          id: `catalog-${Date.now()}`,
        };
        mockDb.pujaCatalog.unshift(newEntry);
        return {
          success: true,
          data: JSON.parse(JSON.stringify(newEntry)),
          message: 'Ceremony catalog entry created successfully.',
        };
      }
      const res = await apiClient.post('/catalog', data);
      return (res as any);
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
      if (config.isMockEnabled) {
        await delay(200);
        const index = mockDb.pujaCatalog.findIndex((e) => e.id === id);
        if (index === -1) {
          return { success: false, message: 'Catalog entry not found.' };
        }
        mockDb.pujaCatalog[index] = {
          ...mockDb.pujaCatalog[index],
          ...data,
        };
        return {
          success: true,
          data: JSON.parse(JSON.stringify(mockDb.pujaCatalog[index])),
          message: 'Ceremony catalog entry updated successfully.',
        };
      }
      const res = await apiClient.put(`/catalog/${id}`, data);
      return (res as any);
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
      if (config.isMockEnabled) {
        await delay(200);
        const index = mockDb.pujaCatalog.findIndex((e) => e.id === id);
        if (index === -1) {
          return { success: false, message: 'Catalog entry not found.' };
        }
        mockDb.pujaCatalog.splice(index, 1);
        return { success: true, message: 'Ceremony removed from catalog.' };
      }
      const res = await apiClient.delete(`/catalog/${id}`);
      return (res as any);
    } catch (error) {
      logAppError('catalogApi.deleteCatalogEntry', error, { id });
      return {
        success: false,
        message: getUserFriendlyErrorMessage(error, 'Failed to delete catalog entry.'),
      };
    }
  },
};
