-- ============================================================
-- Health-ID: Complete Supabase Database Schema
-- Run this entire file in: Supabase → SQL Editor → New Query
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================
-- TABLE: users
-- ============================================================
CREATE TABLE IF NOT EXISTS public.users (
  uid               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hid               TEXT UNIQUE NOT NULL,           -- HID-XXXXX-XXXXX
  phone             TEXT UNIQUE NOT NULL,
  email             TEXT UNIQUE,
  name              TEXT NOT NULL,
  dob               DATE,
  gender            TEXT CHECK (gender IN ('male','female','other','prefer_not_to_say')),
  -- Aadhaar: NEVER store full number, only SHA-256 hash
  aadhaar_hash      TEXT,
  aadhaar_mask      TEXT,                           -- last 4 digits only e.g. "XXXX XXXX 4321"
  password_hash     TEXT NOT NULL,                  -- bcrypt hash
  pin               TEXT,                           -- 6-digit PIN bcrypt hash
  blood_type        TEXT,
  height_cm         INTEGER,
  weight_kg         NUMERIC(5,2),
  city              TEXT,
  state             TEXT DEFAULT 'Assam',
  -- Arrays
  allergies         TEXT[]   DEFAULT '{}',
  conditions        TEXT[]   DEFAULT '{}',
  -- JSONB blobs
  medications       JSONB    DEFAULT '[]',
  emergency_contact JSONB    DEFAULT '{}',
  insurance         JSONB    DEFAULT '{}',
  vitals            JSONB    DEFAULT '{}',
  records           JSONB    DEFAULT '[]',
  appointments      JSONB    DEFAULT '[]',
  notifications     JSONB    DEFAULT '[]',
  -- Scores
  health_score      INTEGER  DEFAULT 0 CHECK (health_score BETWEEN 0 AND 100),
  security_score    INTEGER  DEFAULT 0 CHECK (security_score BETWEEN 0 AND 100),
  -- Verification flags
  verified          JSONB    DEFAULT '{"phone":false,"email":false,"aadhaar":false}',
  -- Settings
  security_settings JSONB   DEFAULT '{"twoFA":true,"biometric":false,"notifications":true,"autoLock":true}',
  -- Security
  login_attempts    INTEGER  DEFAULT 0,
  locked            BOOLEAN  DEFAULT false,
  locked_until      TIMESTAMPTZ,
  onboarded         BOOLEAN  DEFAULT false,
  last_login        TIMESTAMPTZ,
  created_at        TIMESTAMPTZ DEFAULT now(),
  updated_at        TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- TABLE: otp_logs  (for OTP rate limiting & verification)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.otp_logs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone       TEXT NOT NULL,
  otp_hash    TEXT NOT NULL,       -- SHA-256 hash of OTP
  purpose     TEXT NOT NULL,       -- 'login' | 'register' | 'aadhaar'
  expires_at  TIMESTAMPTZ NOT NULL,
  used        BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- TABLE: audit_logs  (security audit trail)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  uid         UUID REFERENCES public.users(uid) ON DELETE CASCADE,
  event_type  TEXT NOT NULL,       -- 'login' | 'logout' | 'data_access' | 'update' | 'failed_login'
  ip_address  TEXT,
  user_agent  TEXT,
  metadata    JSONB DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_users_phone     ON public.users(phone);
CREATE INDEX IF NOT EXISTS idx_users_hid       ON public.users(hid);
CREATE INDEX IF NOT EXISTS idx_users_email     ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_otp_phone       ON public.otp_logs(phone);
CREATE INDEX IF NOT EXISTS idx_audit_uid       ON public.audit_logs(uid);

-- ============================================================
-- FUNCTION: auto-update updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================
ALTER TABLE public.users       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs  ENABLE ROW LEVEL SECURITY;

-- Users can only read/write their own row
CREATE POLICY "users_self_only" ON public.users
  FOR ALL USING (uid::text = auth.uid()::text);

-- Audit logs: users can read their own, service role writes
CREATE POLICY "audit_read_own" ON public.audit_logs
  FOR SELECT USING (uid::text = auth.uid()::text);

-- OTP table: only service role (server-side API) accesses this
-- No RLS policy = accessible only via service_role key (never anon/user)

-- ============================================================
-- FUNCTION: generate_hid()  — Creates HID-XXXXX-XXXXX format
-- ============================================================
CREATE OR REPLACE FUNCTION generate_hid()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  part1 TEXT := '';
  part2 TEXT := '';
  i     INT;
BEGIN
  FOR i IN 1..5 LOOP
    part1 := part1 || substr(chars, floor(random() * length(chars) + 1)::int, 1);
    part2 := part2 || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  RETURN 'HID-' || part1 || '-' || part2;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- CLEANUP: auto-delete expired OTPs (run as cron via pg_cron)
-- Enable pg_cron extension in Supabase: Database → Extensions
-- ============================================================
-- SELECT cron.schedule('cleanup-expired-otps', '*/15 * * * *',
--   $$ DELETE FROM public.otp_logs WHERE expires_at < now() $$
-- );