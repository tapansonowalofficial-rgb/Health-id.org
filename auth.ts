// lib/auth.ts
// Server-side auth utilities — only used in API routes (Node.js runtime)
// NEVER import this in client components

import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// Service role client — bypasses RLS, server only
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ─── Password ─────────────────────────────────────────────────────────────────

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ─── Aadhaar ──────────────────────────────────────────────────────────────────

/** One-way hash — we NEVER store the full Aadhaar number */
export function hashAadhaar(aadhaarNumber: string): string {
  const cleaned = aadhaarNumber.replace(/\s/g, '');
  return crypto.createHash('sha256').update(cleaned + process.env.JWT_SECRET).digest('hex');
}

export function maskAadhaar(aadhaarNumber: string): string {
  const cleaned = aadhaarNumber.replace(/\s/g, '');
  return 'XXXX XXXX ' + cleaned.slice(-4);
}

// ─── OTP ──────────────────────────────────────────────────────────────────────

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function hashOTP(otp: string): string {
  return crypto.createHash('sha256').update(otp).digest('hex');
}

export async function storeOTP(phone: string, otp: string, purpose: string): Promise<void> {
  const otpHash = hashOTP(otp);
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  // Invalidate any existing OTPs for this phone+purpose
  await supabaseAdmin
    .from('otp_logs')
    .update({ used: true })
    .eq('phone', phone)
    .eq('purpose', purpose)
    .eq('used', false);

  await supabaseAdmin.from('otp_logs').insert({
    phone,
    otp_hash: otpHash,
    purpose,
    expires_at: expiresAt.toISOString(),
  });
}

export async function verifyOTP(
  phone: string,
  otp: string,
  purpose: string
): Promise<{ valid: boolean; error?: string }> {
  const otpHash = hashOTP(otp);

  const { data, error } = await supabaseAdmin
    .from('otp_logs')
    .select('*')
    .eq('phone', phone)
    .eq('otp_hash', otpHash)
    .eq('purpose', purpose)
    .eq('used', false)
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    return { valid: false, error: 'Invalid or expired OTP' };
  }

  // Mark as used
  await supabaseAdmin.from('otp_logs').update({ used: true }).eq('id', data.id);

  return { valid: true };
}

// ─── HID Generator ────────────────────────────────────────────────────────────

export function generateHID(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const rand = (n: number) =>
    Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `HID-${rand(5)}-${rand(5)}`;
}

// ─── Session Token ────────────────────────────────────────────────────────────

export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// ─── Audit Log ────────────────────────────────────────────────────────────────

export async function writeAuditLog(
  uid: string,
  eventType: string,
  metadata: Record<string, unknown> = {},
  ipAddress?: string
): Promise<void> {
  await supabaseAdmin.from('audit_logs').insert({
    uid,
    event_type: eventType,
    ip_address: ipAddress,
    metadata,
  });
}