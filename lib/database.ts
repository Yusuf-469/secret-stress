import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Collection references
export const collections = {
  submissions: collection(db, 'submissions'),
  users: collection(db, 'users'),
  crisisAlerts: collection(db, 'crisisAlerts'),
  analytics: collection(db, 'analytics'),
  adminOnly: collection(db, 'adminOnly'),
};

// Types
export interface Submission {
  id?: string;
  content: string;
  stressLevel: number;
  tags: string[];
  status: 'pending' | 'reviewed' | 'flagged' | 'resolved';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId?: string; // Optional for anonymous submissions
}

export interface User {
  id: string;
  email?: string;
  displayName?: string;
  createdAt: Timestamp;
  submissionCount: number;
  status: 'active' | 'flagged' | 'banned';
}

export interface CrisisAlert {
  id?: string;
  submissionId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'resolved';
  createdAt: Timestamp;
  resolvedAt?: Timestamp;
}

// Submission operations
export const submissionOps = {
  // Create a new submission (anonymous or authenticated)
  async create(submission: Omit<Submission, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(collections.submissions, {
      ...submission,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  },

  // Get all submissions (admin only)
  async getAll(): Promise<Submission[]> {
    const q = query(collections.submissions, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Submission));
  },

  // Update submission status (admin only)
  async updateStatus(id: string, status: Submission['status']): Promise<void> {
    const docRef = doc(collections.submissions, id);
    await updateDoc(docRef, {
      status,
      updatedAt: Timestamp.now(),
    });
  },

  // Delete submission (admin only)
  async delete(id: string): Promise<void> {
    const docRef = doc(collections.submissions, id);
    await deleteDoc(docRef);
  },
};

// User operations
export const userOps = {
  // Get user by ID
  async getById(uid: string): Promise<User | null> {
    const docRef = doc(collections.users, uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as User;
    }
    return null;
  },

  // Create or update user profile
  async upsert(user: Omit<User, 'id'> & { id: string }): Promise<void> {
    const docRef = doc(collections.users, user.id);
    await updateDoc(docRef, {
      ...user,
      updatedAt: Timestamp.now(),
    });
  },
};

// Crisis alert operations
export const crisisOps = {
  // Create a crisis alert (admin only)
  async create(alert: Omit<CrisisAlert, 'id' | 'createdAt'>): Promise<string> {
    const docRef = await addDoc(collections.crisisAlerts, {
      ...alert,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  },

  // Get all active crisis alerts (admin only)
  async getActive(): Promise<CrisisAlert[]> {
    const q = query(
      collections.crisisAlerts,
      where('status', '==', 'active'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as CrisisAlert));
  },

  // Resolve a crisis alert (admin only)
  async resolve(id: string): Promise<void> {
    const docRef = doc(collections.crisisAlerts, id);
    await updateDoc(docRef, {
      status: 'resolved',
      resolvedAt: Timestamp.now(),
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
    // This would typically aggregate data from various collections
    // For now, return mock data - replace with real aggregations
    const submissionsSnapshot = await getDocs(collections.submissions);
    const usersSnapshot = await getDocs(collections.users);
    const alertsSnapshot = await getDocs(
      query(collections.crisisAlerts, where('status', '==', 'active'))
    );
    const resolvedSnapshot = await getDocs(
      query(collections.crisisAlerts, where('status', '==', 'resolved'))
    );

    return {
      totalSubmissions: submissionsSnapshot.size,
      activeUsers: usersSnapshot.size,
      crisisAlerts: alertsSnapshot.size,
      resolvedCases: resolvedSnapshot.size,
    };
  },
};