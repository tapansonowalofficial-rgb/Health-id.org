import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/services/aiService';
import { userService } from '@/lib/services/userService';

export async function POST(request: NextRequest) {
  try {
    const uid = request.headers.get('x-user-id');
    if (!uid) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { query } = await request.json();
    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    // Get user health profile
    const userProfile = await userService.getUserById(uid);
    if (!userProfile) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get AI analysis from Claude
    const analysis = await aiService.analyzeHealth({
      userProfile,
      userQuery: query,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          query,
          analysis,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[HEALTH ANALYSIS ERROR]', error);
    return NextResponse.json(
      { error: error.message || 'Failed to analyze health' },
      { status: 500 }
    );
  }
}
