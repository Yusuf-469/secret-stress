/**
 * Admin Role Assignment Script
 *
 * This script assigns admin role to a user by UID.
 * Run this from the server-side or with proper Firebase Admin SDK setup.
 *
 * Usage: node scripts/assign-admin.js <user-uid>
 */

import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK (only if not already initialized)
if (!admin.apps.length) {
  // For local development, use service account key
  // In production, use environment variables or application default credentials
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
    : null;

  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: 'silentstress-b3937',
    });
  } else {
    // Use application default credentials (for Google Cloud environments)
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: 'silentstress-b3937',
    });
  }
}

/**
 * Assign admin role to a user
 */
export async function assignAdminRole(uid: string): Promise<void> {
  try {
    await admin.auth().setCustomUserClaims(uid, {
      admin: true,
    });
    console.log(`✅ Admin role assigned to user: ${uid}`);
  } catch (error) {
    console.error(`❌ Failed to assign admin role:`, error);
    throw error;
  }
}

/**
 * Remove admin role from a user
 */
export async function removeAdminRole(uid: string): Promise<void> {
  try {
    await admin.auth().setCustomUserClaims(uid, {
      admin: false,
    });
    console.log(`✅ Admin role removed from user: ${uid}`);
  } catch (error) {
    console.error(`❌ Failed to remove admin role:`, error);
    throw error;
  }
}

/**
 * Check if a user has admin role
 */
export async function checkAdminRole(uid: string): Promise<boolean> {
  try {
    const user = await admin.auth().getUser(uid);
    return user.customClaims?.admin === true;
  } catch (error) {
    console.error(`❌ Failed to check admin role:`, error);
    return false;
  }
}

// CLI usage
if (require.main === module) {
  const [,, command, uid] = process.argv;

  if (!command || !uid) {
    console.log('Usage:');
    console.log('  node scripts/assign-admin.js assign <user-uid>');
    console.log('  node scripts/assign-admin.js remove <user-uid>');
    console.log('  node scripts/assign-admin.js check <user-uid>');
    process.exit(1);
  }

  if (command === 'assign') {
    assignAdminRole(uid).catch(console.error);
  } else if (command === 'remove') {
    removeAdminRole(uid).catch(console.error);
  } else if (command === 'check') {
    checkAdminRole(uid).then(isAdmin => {
      console.log(`User ${uid} ${isAdmin ? 'has' : 'does not have'} admin role`);
    }).catch(console.error);
  } else {
    console.log('Invalid command. Use assign, remove, or check.');
    process.exit(1);
  }
}