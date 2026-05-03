import { NextRequest, NextResponse } from 'next/server';
import { adminClient } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  try {
    const uid = request.headers.get('x-user-id');
    if (!uid) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { heartRate, bloodPressure, spO2, bloodSugar, temperature } =
      await request.json();

    // Validate vitals
    if (!heartRate || !bloodPressure || !spO2) {
      return NextResponse.json(
        { error: 'Heart rate, blood pressure, and SpO2 are required' },
        { status: 400 }
      );
    }

    // Get user
    const { data: user, error: userError } = await adminClient
      .from('users')
      .select('vitals')
      .eq('uid', uid)
      .single();

    if (userError) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Create vitals object
    const vital = {
      id: Math.random().toString(36).substr(2, 9),
      heartRate,
      bloodPressure,
      spO2,
      bloodSugar: bloodSugar || null,
      temperature: temperature || null,
      timestamp: new Date().toISOString(),
    };

    // Append to vitals array
    const vitals = user.vitals ? [...user.vitals, vital] : [vital];

    // Update user
    const { data: updated, error } = await adminClient
      .from('users')
      .update({ vitals })
      .eq('uid', uid)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to save vitals' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Vitals recorded successfully',
        data: vital,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('[ADD VITALS ERROR]', error);
    return NextResponse.json(
      { error: error.message || 'Failed to add vitals' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const uid = request.headers.get('x-user-id');
    if (!uid) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data: user, error } = await adminClient
      .from('users')
      .select('vitals')
      .eq('uid', uid)
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: user.vitals || [],
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[GET VITALS ERROR]', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch vitals' },
      { status: 500 }
    );
  }
}
