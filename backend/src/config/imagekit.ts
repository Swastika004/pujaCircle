import ImageKit from 'imagekit';
import { env } from './env.js';

/**
 * ImageKit SDK Instance
 * Used for secure server-side image upload, authentication parameters generation,
 * and media management for Priest KYC documents and Puja catalog imagery.
 */
export const imagekit = new ImageKit({
  publicKey: env.IMAGEKIT_PUBLIC_KEY,
  privateKey: env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: env.IMAGEKIT_URL_ENDPOINT,
});
