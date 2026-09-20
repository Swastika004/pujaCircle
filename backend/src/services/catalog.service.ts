import { db } from '../config/db.js';
import { pujaCatalog, NewPujaCatalog } from '../models/catalog.model.js';

export class CatalogService {
  // Get all active sacred ceremonies for catalog
  async getCatalog() {
    const entries = await db
      .select()
      .from(pujaCatalog);

    return entries.map((e) => ({
      ...e,
      coverImage: '/images/hero_vedic_puja.jpg',
    }));
  }

  // Insert a new sacred ceremony into the catalog
  async createCatalogEntry(data: NewPujaCatalog) {
    const [entry] = await db
      .insert(pujaCatalog)
      .values({
        name: data.name,
        deity: data.deity,
        category: data.category,
        description: data.description,
        intentTags: data.intentTags || [],
        samagriList: data.samagriList || [],
        steps: data.steps || [],
        timingNote: data.timingNote || '',
        isActive: data.isActive ?? true,
      })
      .returning();

    return entry;
  }
}

export const catalogService = new CatalogService();
