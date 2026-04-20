import { auth } from '@/lib/firebase';

/**
 * Check if the current user has admin privileges
 * This reads from the ID token claims (secure, not spoofable)
 */
export async function checkAdminRole(): Promise<boolean> {
  try {
    const user = auth.currentUser;
    if (!user) return false;

    // Force refresh token to get latest claims
    const tokenResult = await user.getIdTokenResult(true);
    return tokenResult.claims.admin === true;
  } catch (error) {
    console.error('Error checking admin role:', error);
    return false;
  }
}

/**
 * Get the current user's ID token result with claims
 */
export async function getUserClaims() {
  try {
    const user = auth.currentUser;
    if (!user) return null;

    return await user.getIdTokenResult();
  } catch (error) {
    console.error('Error getting user claims:', error);
    return null;
  }
}