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

    const { type, title, description, fileUrl, date } = await request.json();

    if (!type || !title) {
      return NextResponse.json(
        { error: 'Type and title are required' },
        { status: 400 }
      );
    }

    // Get user
    const { data: user } = await adminClient
      .from('users')
      .select('records')
      .eq('uid', uid)
      .single();

    // Create record
    const record = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      title,
      description,
      fileUrl,
      date: date || new Date().toISOString().split('T')[0],
      uploadedAt: new Date().toISOString(),
    };

    // Append to records
    const records = user?.records ? [...user.records, record] : [record];

    // Update user
    const { error } = await adminClient
      .from('users')
      .update({ records })
      .eq('uid', uid);

    if (error) {
      return NextResponse.json(
        { error: 'Failed to save record' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Medical record saved successfully',
        data: record,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('[ADD RECORD ERROR]', error);
    return NextResponse.json(
      { error: error.message || 'Failed to add record' },
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
      .select('records')
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
        data: user.records || [],
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[GET RECORDS ERROR]', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch records' },
      { status: 500 }
    );
  }
}
