import { NextRequest, NextResponse } from 'next/server';
import { qrService } from '@/lib/services/qrService';
import { userService } from '@/lib/services/userService';

export async function GET(request: NextRequest) {
  try {
    const uid = request.headers.get('x-user-id');
    if (!uid) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user profile
    const user = await userService.getUserById(uid);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Generate QR code data
    const qrData = {
      hid: user.hid,
      name: user.name,
      phone: user.phone,
      bloodType: user.blood_type,
      allergies: user.allergies,
      emergencyContact: user.emergency_contact,
      timestamp: new Date().toISOString(),
    };

    // Generate QR code as data URL
    const qrCodeDataURL = await qrService.generateQRCode(JSON.stringify(qrData));

    return NextResponse.json(
      {
        success: true,
        data: {
          hid: user.hid,
          qrCode: qrCodeDataURL,
          encodedData: qrData,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[QR GENERATION ERROR]', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate QR code' },
      { status: 500 }
    );
  }
}
