import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/services/authService';
import { userService } from '@/lib/services/userService';

export async function POST(request: NextRequest) {
  try {
    const { phone, email, password, name } = await request.json();

    // Validate input
    if (!phone || !password || !name) {
      return NextResponse.json(
        { error: 'Phone, password, and name are required' },
        { status: 400 }
      );
    }

    // Validate phone format
    if (!authService.validatePhone(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await authService.hashPassword(password);

    // Generate Health ID
    const hid = `HID-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create user in database
    const user = await userService.createUser({
      hid,
      phone,
      email: email || null,
      name,
      password_hash: passwordHash,
      blood_type: '',
      height: '',
      weight: '',
      city: '',
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful',
        data: {
          uid: user.uid,
          hid: user.hid,
          phone: user.phone,
          name: user.name,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('[REGISTER ERROR]', error);
    return NextResponse.json(
      { error: error.message || 'Registration failed' },
      { status: 500 }
    );
  }
}
