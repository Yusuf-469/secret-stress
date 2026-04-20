import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: 'silentstress-b3937',
  });
}

/**
 * POST /api/admin/assign-role
 * Assign admin role to a user by UID
 * Body: { uid: string, admin: boolean }
 */
export async function POST(request: NextRequest) {
  try {
    const { uid, admin: isAdmin } = await request.json();

    if (!uid) {
      return NextResponse.json({ error: 'UID is required' }, { status: 400 });
    }

    // Set custom claims for the user
    await admin.auth().setCustomUserClaims(uid, {
      admin: isAdmin || false,
    });

    return NextResponse.json({
      success: true,
      message: `Admin role ${isAdmin ? 'assigned' : 'removed'} for user ${uid}`,
    });
  } catch (error) {
    console.error('Error setting admin claims:', error);
    return NextResponse.json(
      { error: 'Failed to update admin role' },
      { status: 500 }
    );
  }
}