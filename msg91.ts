// lib/msg91.ts
// Sends OTP via MSG91. Server-side only.

export async function sendOTPviaMSG91(phone: string, otp: string): Promise<boolean> {
  const apiKey      = process.env.MSG91_API_KEY!;
  const templateId  = process.env.MSG91_TEMPLATE_ID!;
  const senderId    = process.env.MSG91_SENDER_ID || 'HLTHID';

  const payload = {
    template_id: templateId,
    mobile:      `91${phone}`,          // India prefix
    authkey:     apiKey,
    otp,
    otp_expiry:  5,                     // minutes
  };

  try {
    const response = await fetch('https://api.msg91.com/api/v5/otp', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.type === 'success') {
      return true;
    }

    console.error('[MSG91] OTP send failed:', data);
    return false;
  } catch (err) {
    console.error('[MSG91] Network error:', err);
    return false;
  }
}

// ─── Resend OTP ───────────────────────────────────────────────────────────────

export async function resendOTPviaMSG91(phone: string): Promise<boolean> {
  const apiKey = process.env.MSG91_API_KEY!;

  try {
    const response = await fetch(
      `https://api.msg91.com/api/v5/otp/retry?authkey=${apiKey}&mobile=91${phone}&retrytype=text`,
      { method: 'POST' }
    );
    const data = await response.json();
    return data.type === 'success';
  } catch {
    return false;
  }
}