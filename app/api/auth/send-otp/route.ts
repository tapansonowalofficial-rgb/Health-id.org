import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/services/authService';

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    // Validate phone
    if (!authService.validatePhone(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    // Generate OTP
    const otp = authService.generateOTP();

    // Store OTP in cache (Redis/memory) - expires in 5 minutes
    // For demo: store in response header
    const response = NextResponse.json(
      {
        success: true,
        message: 'OTP sent successfully',
        // In production, don't return OTP - only for demo
        data: { otp, phone, expiresIn: '5 minutes' },
      },
      { status: 200 }
    );

    // TODO: Integrate with MSG91/Twilio
    // await authService.sendOTPViaSMS(phone, otp);

    return response;
  } catch (error: any) {
    console.error('[SEND OTP ERROR]', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send OTP' },
      { status: 500 }
    );
  }
}
