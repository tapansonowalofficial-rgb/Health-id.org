import { createHmac, pbkdf2Sync } from 'crypto';

/**
 * Professional-grade hashing for Government IDs (Aadhaar/Health-ID).
 * Uses PBKDF2 with 100,000 iterations for brute-force resistance.
 */
export function secureHash(input: string): string {
  const salt = process.env.IDENTITY_SALT || 'neural-default-salt-2026';
  const iterations = 100000;
  const keylen = 64;
  const digest = 'sha512';

  return pbkdf2Sync(input, salt, iterations, keylen, digest).toString('hex');
}

/**
 * Standard masking for sensitive UI data.
 */
export function maskData(val: string): string {
  return val.replace(/.(?=.{4})/g, 'X');
}
