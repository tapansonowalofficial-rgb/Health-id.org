// lib/supabase.ts
// Supabase client — used on the browser side (anon key only)

import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnon) {
  throw new Error('Missing Supabase env vars. Check .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnon, {
  auth: {
    persistSession: false,   // We manage sessions manually with JWT
    autoRefreshToken: false,
  },
});

// ─── Types ────────────────────────────────────────────────────────────────────

export interface HealthUser {
  uid: string;
  hid: string;
  phone: string;
  email?: string;
  name: string;
  dob?: string;
  gender?: string;
  aadhaar_mask?: string;
  blood_type?: string;
  height_cm?: number;
  weight_kg?: number;
  city?: string;
  state?: string;
  allergies: string[];
  conditions: string[];
  medications: Medication[];
  emergency_contact: EmergencyContact;
  insurance: Insurance;
  vitals: Vitals;
  records: MedicalRecord[];
  appointments: Appointment[];
  health_score: number;
  security_score: number;
  verified: { phone: boolean; email: boolean; aadhaar: boolean };
  security_settings: SecuritySettings;
  onboarded: boolean;
  last_login?: string;
  created_at: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  startDate: string;
}

export interface EmergencyContact {
  name?: string;
  relation?: string;
  phone?: string;
}

export interface Insurance {
  provider?: string;
  policyNumber?: string;
  groupNumber?: string;
  expiryDate?: string;
}

export interface Vitals {
  heartRate?: number;
  systolic?: number;
  diastolic?: number;
  spo2?: number;
  bloodSugar?: number;
  updatedAt?: string;
}

export interface MedicalRecord {
  id: string;
  type: 'lab' | 'imaging' | 'prescription' | 'ecg' | 'other';
  title: string;
  date: string;
  doctor?: string;
  hospital?: string;
  fileUrl?: string;
  notes?: string;
}

export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  hospital: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
}

export interface SecuritySettings {
  twoFA: boolean;
  biometric: boolean;
  notifications: boolean;
  autoLock: boolean;
}