import { pbkdf2Sync } from 'crypto';

/**
 * Professional-grade hashing for Identifiers.
 * Uses PBKDF2 to prevent brute-force attacks on sensitive IDs.
 */
export function secureHash(input: string): string {
  const salt = process.env.IDENTITY_SALT || 'fallback-salt';
  const iterations = 100000;
  const keylen = 64;
  const digest = 'sha512';

  return pbkdf2Sync(input, salt, iterations, keylen, digest).toString('hex');
}

export function maskID(id: string): string {
  return `XXXX-XXXX-${id.slice(-4)}`;
}
