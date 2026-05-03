import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/services/authService';
import { userService } from '@/lib/services/userService';
import { adminClient } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  try {
    const { phone, password } = await request.json();

    // Validate input
    if (!phone || !password) {
      return NextResponse.json(
        { error: 'Phone and password are required' },
        { status: 400 }
      );
    }

    // Get user by phone
    const user = await userService.getUserByPhone(phone);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check if account is locked
    if (user.locked) {
      return NextResponse.json(
        { error: 'Account is locked. Please contact support.' },
        { status: 403 }
      );
    }

    // Verify password
    const isValid = await authService.verifyPassword(password, user.password_hash);
    if (!isValid) {
      // Increment failed attempts
      const attempts = (user.login_attempts || 0) + 1;
      await adminClient
        .from('users')
        .update({ login_attempts: attempts })
        .eq('uid', user.uid);

      // Lock account after 5 failed attempts
      if (attempts >= 5) {
        await adminClient
          .from('users')
          .update({ locked: true })
          .eq('uid', user.uid);
        return NextResponse.json(
          { error: 'Account locked due to multiple failed attempts' },
          { status: 403 }
        );
      }

      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate session token
    const sessionToken = authService.generateSessionToken();

    // Update last login & reset attempts
    await adminClient
      .from('users')
      .update({
        last_login: new Date().toISOString(),
        login_attempts: 0,
      })
      .eq('uid', user.uid);

    // Create response
    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        data: {
          uid: user.uid,
          hid: user.hid,
          phone: user.phone,
          name: user.name,
          email: user.email,
          sessionToken,
        },
      },
      { status: 200 }
    );

    // Set session cookie
    response.cookies.set({
      name: 'sessionToken',
      value: sessionToken,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('[LOGIN ERROR]', error);
    return NextResponse.json(
      { error: error.message || 'Login failed' },
      { status: 500 }
    );
  }
}
