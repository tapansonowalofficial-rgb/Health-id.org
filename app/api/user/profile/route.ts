import { NextRequest, NextResponse } from 'next/server';
import { userService } from '@/lib/services/userService';
import { adminClient } from '@/lib/supabase/admin';

// GET user profile
export async function GET(request: NextRequest) {
  try {
    const uid = request.headers.get('x-user-id');
    if (!uid) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await userService.getUserById(uid);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[GET PROFILE ERROR]', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

// UPDATE user profile
export async function PUT(request: NextRequest) {
  try {
    const uid = request.headers.get('x-user-id');
    if (!uid) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const updates = await request.json();

    const updatedUser = await userService.updateUser(uid, {
      name: updates.name,
      email: updates.email,
      blood_type: updates.blood_type,
      height: updates.height,
      weight: updates.weight,
      city: updates.city,
      allergies: updates.allergies,
      conditions: updates.conditions,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Profile updated successfully',
        data: updatedUser,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[UPDATE PROFILE ERROR]', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update profile' },
      { status: 500 }
    );
  }
}
