import { imagekit } from '../config/imagekit.js';

/**
 * [SERVICE] ImageKit Service
 * Media upload utility for profile pictures, KYC verification documents,
 * and puja catalog banners.
 */
export class ImageKitService {
  /**
   * Generate signed authentication parameters for direct frontend-to-ImageKit uploads
   */
  getAuthenticationParameters() {
    return imagekit.getAuthenticationParameters();
  }

  /**
   * Upload an image buffer or base64 data string directly to ImageKit
   */
  async uploadFile(file: string | Buffer, fileName: string, folder = '/pujacircle/uploads') {
    return imagekit.upload({
      file,
      fileName,
      folder,
      useUniqueFileName: true,
    });
  }

  /**
   * Delete a media file from ImageKit storage by file ID
   */
  async deleteFile(fileId: string) {
    return imagekit.deleteFile(fileId);
  }
}

export const imageKitService = new ImageKitService();
