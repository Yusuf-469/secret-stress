import {
  getDatabase,
  ref,
  push,
  set,
  update,
  remove,
  query,
  orderByChild,
  equalTo,
  get,
} from 'firebase/database';
import { db, ref as databaseRef } from '@/lib/firebase';

// Database references
export const dbRefs = {
  submissions: databaseRef(db, 'submissions'),
  users: databaseRef(db, 'users'),
  crisisAlerts: databaseRef(db, 'crisisAlerts'),
  analytics: databaseRef(db, 'analytics'),
  adminOnly: databaseRef(db, 'adminOnly'),
};

// Types
export interface Submission {
  id?: string;
  content: string;
  stressLevel: number;
  tags: string[];
  status: 'pending' | 'reviewed' | 'flagged' | 'resolved';
  createdAt: number; // Timestamp as number for Realtime DB
  updatedAt: number;
  userId?: string; // Optional for anonymous submissions
}

export interface User {
  id: string;
  email?: string;
  displayName?: string;
  createdAt: number;
  submissionCount: number;
  status: 'active' | 'flagged' | 'banned';
}

export interface CrisisAlert {
  id?: string;
  submissionId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'resolved';
  createdAt: number;
  resolvedAt?: number;
}

// Helper function to convert DataSnapshot to array
function snapshotToArray<T>(snapshot: any): T[] {
  const items: T[] = [];
  snapshot.forEach((childSnapshot: any) => {
    items.push({
      id: childSnapshot.key,
      ...childSnapshot.val(),
    } as T);
  });
  return items;
}

// Submission operations
export const submissionOps = {
  // Create a new submission (anonymous or authenticated)
  async create(submission: Omit<Submission, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const newRef = push(dbRefs.submissions);
    const newSubmission: Submission = {
      ...submission,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await set(newRef, newSubmission);
    return newRef.key!;
  },

  // Get all submissions (admin only) - using Realtime Database query
  async getAll(): Promise<Submission[]> {
    const submissionsSnapshot = await get(query(databaseRef(db, 'submissions'), orderByChild('createdAt')));
    const submissions = snapshotToArray<Submission>(submissionsSnapshot);
    // Realtime DB doesn't sort descending by default, so we reverse the array
    return submissions.reverse();
  },

  // Update submission status (admin only)
  async updateStatus(id: string, status: Submission['status']): Promise<void> {
    const submissionRef = databaseRef(db, `submissions/${id}`);
    await update(submissionRef, {
      status,
      updatedAt: Date.now(),
    });
  },

  // Delete submission (admin only)
  async delete(id: string): Promise<void> {
    const submissionRef = databaseRef(db, `submissions/${id}`);
    await remove(submissionRef);
  },
};

// User operations
export const userOps = {
  // Get user by ID
  async getById(uid: string): Promise<User | null> {
    const userRef = databaseRef(db, `users/${uid}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      return {
        id: uid,
        ...snapshot.val(),
      } as User;
    }
    return null;
  },

  // Create or update user profile
  async upsert(user: Omit<User, 'id'> & { id: string }): Promise<void> {
    const userRef = databaseRef(db, `users/${user.id}`);
    await set(userRef, {
      ...user,
      updatedAt: Date.now(),
    });
  },
};

// Crisis alert operations
export const crisisOps = {
  // Create a crisis alert (admin only)
  async create(alert: Omit<CrisisAlert, 'id' | 'createdAt'>): Promise<string> {
    const newRef = push(dbRefs.crisisAlerts);
    const newAlert: CrisisAlert = {
      ...alert,
      createdAt: Date.now(),
    };
    await set(newRef, newAlert);
    return newRef.key!;
  },

  // Get all active crisis alerts (admin only)
  async getActive(): Promise<CrisisAlert[]> {
    const alertsSnapshot = await get(query(databaseRef(db, 'crisisAlerts'), orderByChild('status'), equalTo('active')));
    const alerts = snapshotToArray<CrisisAlert>(alertsSnapshot);
    return alerts;
  },

  // Resolve a crisis alert (admin only)
  async resolve(id: string): Promise<void> {
    const alertRef = databaseRef(db, `crisisAlerts/${id}`);
    await update(alertRef, {
      status: 'resolved',
      resolvedAt: Date.now(),
    });
  },
};

// Analytics operations
export const analyticsOps = {
  // Get dashboard stats (admin only)
  async getStats(): Promise<{
    totalSubmissions: number;
    activeUsers: number;
    crisisAlerts: number;
    resolvedCases: number;
  }> {
    try {
      const dbInstance = getDatabase();
      
      // Get submissions count
      const submissionsSnapshot = await get(query(databaseRef(dbInstance, 'submissions')));
      const totalSubmissions = submissionsSnapshot.exists() ? Object.keys(submissionsSnapshot.val()).length : 0;

      // Get users count
      const usersSnapshot = await get(databaseRef(dbInstance, 'users'));
      const activeUsers = usersSnapshot.exists() ? Object.keys(usersSnapshot.val()).length : 0;

      // Get crisis alerts count
      const alertsSnapshot = await get(query(databaseRef(dbInstance, 'crisisAlerts'), orderByChild('status'), equalTo('active')));
      const crisisAlerts = alertsSnapshot.exists() ? Object.keys(alertsSnapshot.val()).length : 0;

      // Get resolved cases count
      const resolvedSnapshot = await get(query(databaseRef(dbInstance, 'crisisAlerts'), orderByChild('status'), equalTo('resolved')));
      const resolvedCases = resolvedSnapshot.exists() ? Object.keys(resolvedSnapshot.val()).length : 0;

      return {
        totalSubmissions,
        activeUsers,
        crisisAlerts,
        resolvedCases,
      };
    } catch (error) {
      console.error('Error getting analytics stats:', error);
      // Return zeros on error
      return {
        totalSubmissions: 0,
        activeUsers: 0,
        crisisAlerts: 0,
        resolvedCases: 0,
      };
    }
  },
};