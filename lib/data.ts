import { User, Friend, Group, Expense, Activity, Settlement, Notification, Category, CurrencyCode, CATEGORIES as TypesCategories } from '@/types';

// Re-export CATEGORIES from types
export const CATEGORIES = TypesCategories;

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'AJ',
    defaultCurrency: 'USD',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'user-2',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    avatar: 'SC',
    defaultCurrency: 'USD',
    createdAt: '2024-01-20T10:00:00Z',
  },
  {
    id: 'user-3',
    name: 'Mike Williams',
    email: 'mike@example.com',
    avatar: 'MW',
    defaultCurrency: 'USD',
    createdAt: '2024-02-01T10:00:00Z',
  },
  {
    id: 'user-4',
    name: 'Emily Davis',
    email: 'emily@example.com',
    avatar: 'ED',
    defaultCurrency: 'EUR',
    createdAt: '2024-02-10T10:00:00Z',
  },
  {
    id: 'user-5',
    name: 'James Wilson',
    email: 'james@example.com',
    avatar: 'JW',
    defaultCurrency: 'USD',
    createdAt: '2024-02-15T10:00:00Z',
  },
];

// Mock Current User (logged in)
export const currentUser: User = mockUsers[0];

// Mock Friends
export const mockFriends: Friend[] = [
  {
    id: 'friend-1',
    userId: 'user-1',
    friendId: 'user-2',
    friend: mockUsers[1],
    balance: 45.50,
    status: 'accepted',
    createdAt: '2024-01-20T10:00:00Z',
  },
  {
    id: 'friend-2',
    userId: 'user-1',
    friendId: 'user-3',
    friend: mockUsers[2],
    balance: -23.00,
    status: 'accepted',
    createdAt: '2024-02-01T10:00:00Z',
  },
  {
    id: 'friend-3',
    userId: 'user-1',
    friendId: 'user-4',
    friend: mockUsers[3],
    balance: 120.00,
    status: 'accepted',
    createdAt: '2024-02-10T10:00:00Z',
  },
  {
    id: 'friend-4',
    userId: 'user-1',
    friendId: 'user-5',
    friend: mockUsers[4],
    balance: 0,
    status: 'accepted',
    createdAt: '2024-02-15T10:00:00Z',
  },
];

// Mock Groups
export const mockGroups: Group[] = [
  {
    id: 'group-1',
    name: 'Paris Trip 2024',
    type: 'Trip',
    createdBy: 'user-1',
    members: [
      { userId: 'user-1', user: mockUsers[0], balance: 150.00, joinedAt: '2024-03-01T10:00:00Z' },
      { userId: 'user-2', user: mockUsers[1], balance: -75.00, joinedAt: '2024-03-01T10:00:00Z' },
      { userId: 'user-3', user: mockUsers[2], balance: -75.00, joinedAt: '2024-03-01T10:00:00Z' },
    ],
    totalExpenses: 450.00,
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z',
  },
  {
    id: 'group-2',
    name: 'Apartment Roommates',
    type: 'Home',
    createdBy: 'user-2',
    members: [
      { userId: 'user-1', user: mockUsers[0], balance: -200.00, joinedAt: '2024-01-01T10:00:00Z' },
      { userId: 'user-2', user: mockUsers[1], balance: 200.00, joinedAt: '2024-01-01T10:00:00Z' },
      { userId: 'user-4', user: mockUsers[3], balance: 0, joinedAt: '2024-01-01T10:00:00Z' },
    ],
    totalExpenses: 2400.00,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-03-01T10:00:00Z',
  },
  {
    id: 'group-3',
    name: 'Office Lunch Group',
    type: 'Other',
    createdBy: 'user-3',
    members: [
      { userId: 'user-1', user: mockUsers[0], balance: 25.00, joinedAt: '2024-02-01T10:00:00Z' },
      { userId: 'user-2', user: mockUsers[1], balance: -15.00, joinedAt: '2024-02-01T10:00:00Z' },
      { userId: 'user-3', user: mockUsers[2], balance: -10.00, joinedAt: '2024-02-01T10:00:00Z' },
      { userId: 'user-5', user: mockUsers[4], balance: 0, joinedAt: '2024-02-01T10:00:00Z' },
    ],
    totalExpenses: 150.00,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-28T10:00:00Z',
  },
];

// Mock Expenses
export const mockExpenses: Expense[] = [
  {
    id: 'expense-1',
    description: 'Dinner at Italian Restaurant',
    amount: 120.00,
    currency: 'USD',
    category: 'Food',
    paidBy: 'user-1',
    splitMethod: 'equal',
    splits: [
      { userId: 'user-1', amount: 40.00 },
      { userId: 'user-2', amount: 40.00 },
      { userId: 'user-3', amount: 40.00 },
    ],
    groupId: 'group-1',
    isRecurring: false,
    date: '2024-03-10T19:30:00Z',
    createdAt: '2024-03-10T19:30:00Z',
    updatedAt: '2024-03-10T19:30:00Z',
    notes: 'Great dinner!',
  },
  {
    id: 'expense-2',
    description: 'Hotel Booking - 3 nights',
    amount: 450.00,
    currency: 'USD',
    category: 'Travel',
    paidBy: 'user-1',
    splitMethod: 'equal',
    splits: [
      { userId: 'user-1', amount: 150.00 },
      { userId: 'user-2', amount: 150.00 },
      { userId: 'user-3', amount: 150.00 },
    ],
    groupId: 'group-1',
    isRecurring: false,
    date: '2024-03-05T14:00:00Z',
    createdAt: '2024-03-05T14:00:00Z',
    updatedAt: '2024-03-05T14:00:00Z',
  },
  {
    id: 'expense-3',
    description: 'Monthly Rent',
    amount: 1800.00,
    currency: 'USD',
    category: 'Rent',
    paidBy: 'user-2',
    splitMethod: 'equal',
    splits: [
      { userId: 'user-1', amount: 600.00 },
      { userId: 'user-2', amount: 600.00 },
      { userId: 'user-4', amount: 600.00 },
    ],
    groupId: 'group-2',
    isRecurring: true,
    recurringFrequency: 'monthly',
    date: '2024-03-01T09:00:00Z',
    createdAt: '2024-03-01T09:00:00Z',
    updatedAt: '2024-03-01T09:00:00Z',
  },
  {
    id: 'expense-4',
    description: 'Electricity Bill',
    amount: 120.00,
    currency: 'USD',
    category: 'Utilities',
    paidBy: 'user-2',
    splitMethod: 'equal',
    splits: [
      { userId: 'user-1', amount: 40.00 },
      { userId: 'user-2', amount: 40.00 },
      { userId: 'user-4', amount: 40.00 },
    ],
    groupId: 'group-2',
    isRecurring: true,
    recurringFrequency: 'monthly',
    date: '2024-03-01T09:00:00Z',
    createdAt: '2024-03-01T09:00:00Z',
    updatedAt: '2024-03-01T09:00:00Z',
  },
  {
    id: 'expense-5',
    description: 'Pizza Friday',
    amount: 60.00,
    currency: 'USD',
    category: 'Food',
    paidBy: 'user-1',
    splitMethod: 'equal',
    splits: [
      { userId: 'user-1', amount: 15.00 },
      { userId: 'user-2', amount: 15.00 },
      { userId: 'user-3', amount: 15.00 },
      { userId: 'user-5', amount: 15.00 },
    ],
    groupId: 'group-3',
    isRecurring: false,
    date: '2024-02-23T12:30:00Z',
    createdAt: '2024-02-23T12:30:00Z',
    updatedAt: '2024-02-23T12:30:00Z',
  },
  {
    id: 'expense-6',
    description: 'Movie Tickets',
    amount: 48.00,
    currency: 'USD',
    category: 'Entertainment',
    paidBy: 'user-3',
    splitMethod: 'equal',
    splits: [
      { userId: 'user-1', amount: 24.00 },
      { userId: 'user-3', amount: 24.00 },
    ],
    isRecurring: false,
    date: '2024-02-20T20:00:00Z',
    createdAt: '2024-02-20T20:00:00Z',
    updatedAt: '2024-02-20T20:00:00Z',
  },
  {
    id: 'expense-7',
    description: 'Grocery Shopping',
    amount: 85.50,
    currency: 'USD',
    category: 'Food',
    paidBy: 'user-4',
    splitMethod: 'equal',
    splits: [
      { userId: 'user-1', amount: 42.75 },
      { userId: 'user-4', amount: 42.75 },
    ],
    isRecurring: false,
    date: '2024-02-18T16:00:00Z',
    createdAt: '2024-02-18T16:00:00Z',
    updatedAt: '2024-02-18T16:00:00Z',
  },
  {
    id: 'expense-8',
    description: 'Uber Ride',
    amount: 23.00,
    currency: 'USD',
    category: 'Travel',
    paidBy: 'user-2',
    splitMethod: 'equal',
    splits: [
      { userId: 'user-1', amount: 11.50 },
      { userId: 'user-2', amount: 11.50 },
    ],
    isRecurring: false,
    date: '2024-02-15T22:00:00Z',
    createdAt: '2024-02-15T22:00:00Z',
    updatedAt: '2024-02-15T22:00:00Z',
  },
];

// Mock Activities
export const mockActivities: Activity[] = [
  {
    id: 'activity-1',
    type: 'expense_created',
    userId: 'user-1',
    user: mockUsers[0],
    description: 'added "Dinner at Italian Restaurant" in Paris Trip 2024',
    metadata: { expenseId: 'expense-1', groupId: 'group-1', amount: 120.00, currency: 'USD' },
    createdAt: '2024-03-10T19:30:00Z',
  },
  {
    id: 'activity-2',
    type: 'expense_created',
    userId: 'user-1',
    user: mockUsers[0],
    description: 'added "Hotel Booking - 3 nights" in Paris Trip 2024',
    metadata: { expenseId: 'expense-2', groupId: 'group-1', amount: 450.00, currency: 'USD' },
    createdAt: '2024-03-05T14:00:00Z',
  },
  {
    id: 'activity-3',
    type: 'settlement',
    userId: 'user-2',
    user: mockUsers[1],
    description: 'settled up with Alex Johnson',
    metadata: { amount: 50.00, currency: 'USD' },
    createdAt: '2024-03-03T10:00:00Z',
  },
  {
    id: 'activity-4',
    type: 'expense_created',
    userId: 'user-2',
    user: mockUsers[1],
    description: 'added "Monthly Rent" in Apartment Roommates',
    metadata: { expenseId: 'expense-3', groupId: 'group-2', amount: 1800.00, currency: 'USD' },
    createdAt: '2024-03-01T09:00:00Z',
  },
  {
    id: 'activity-5',
    type: 'friend_added',
    userId: 'user-5',
    user: mockUsers[4],
    description: 'added you as a friend',
    createdAt: '2024-02-15T10:00:00Z',
  },
  {
    id: 'activity-6',
    type: 'expense_created',
    userId: 'user-1',
    user: mockUsers[0],
    description: 'added "Pizza Friday" in Office Lunch Group',
    metadata: { expenseId: 'expense-5', groupId: 'group-3', amount: 60.00, currency: 'USD' },
    createdAt: '2024-02-23T12:30:00Z',
  },
  {
    id: 'activity-7',
    type: 'group_created',
    userId: 'user-3',
    user: mockUsers[2],
    description: 'created Office Lunch Group',
    metadata: { groupId: 'group-3' },
    createdAt: '2024-02-01T10:00:00Z',
  },
];

// Mock Settlements
export const mockSettlements: Settlement[] = [
  {
    id: 'settlement-1',
    fromUserId: 'user-2',
    toUserId: 'user-1',
    amount: 50.00,
    currency: 'USD',
    method: 'cash',
    createdAt: '2024-03-03T10:00:00Z',
  },
  {
    id: 'settlement-2',
    fromUserId: 'user-1',
    toUserId: 'user-4',
    amount: 30.00,
    currency: 'USD',
    method: 'venmo',
    createdAt: '2024-02-20T15:00:00Z',
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'user-1',
    title: 'New Expense Added',
    message: 'Sarah Chen added "Monthly Rent" for $1,800',
    type: 'info',
    read: false,
    createdAt: '2024-03-01T09:00:00Z',
  },
  {
    id: 'notif-2',
    userId: 'user-1',
    title: 'Payment Received',
    message: 'Sarah Chen settled up with you for $50',
    type: 'success',
    read: true,
    createdAt: '2024-03-03T10:00:00Z',
  },
  {
    id: 'notif-3',
    userId: 'user-1',
    title: 'Friend Request',
    message: 'James Wilson added you as a friend',
    type: 'info',
    read: false,
    createdAt: '2024-02-15T10:00:00Z',
  },
  {
    id: 'notif-4',
    userId: 'user-1',
    title: 'Reminder',
    message: 'You owe Mike Williams $23. Don\'t forget to settle up!',
    type: 'warning',
    read: false,
    createdAt: '2024-02-25T09:00:00Z',
  },
];

// Helper functions for data manipulation
export const getUserById = (userId: string): User | undefined => {
  return mockUsers.find(user => user.id === userId);
};

export const getFriendById = (friendId: string): Friend | undefined => {
  return mockFriends.find(friend => friend.friendId === friendId);
};

export const getGroupById = (groupId: string): Group | undefined => {
  return mockGroups.find(group => group.id === groupId);
};

export const getExpenseById = (expenseId: string): Expense | undefined => {
  return mockExpenses.find(expense => expense.id === expenseId);
};

export const getExpensesByGroup = (groupId: string): Expense[] => {
  return mockExpenses.filter(expense => expense.groupId === groupId);
};

export const getExpensesByFriend = (friendId: string): Expense[] => {
  return mockExpenses.filter(expense => 
    expense.splits.some(split => split.userId === friendId) ||
    expense.paidBy === friendId
  );
};

export const calculateBalanceWithFriend = (friendId: string): number => {
  const friendExpenses = mockExpenses.filter(expense => 
    expense.splits.some(split => split.userId === friendId || split.userId === currentUser.id) &&
    (expense.paidBy === friendId || expense.paidBy === currentUser.id)
  );
  
  let balance = 0;
  
  friendExpenses.forEach(expense => {
    if (expense.paidBy === currentUser.id) {
      // Current user paid, friend owes their share
      const friendSplit = expense.splits.find(split => split.userId === friendId);
      if (friendSplit) {
        balance += friendSplit.amount;
      }
    } else if (expense.paidBy === friendId) {
      // Friend paid, current user owes their share
      const userSplit = expense.splits.find(split => split.userId === currentUser.id);
      if (userSplit) {
        balance -= userSplit.amount;
      }
    }
  });
  
  return balance;
};

export const formatCurrency = (amount: number, currency: CurrencyCode = 'USD'): string => {
  const symbols: Record<CurrencyCode, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    INR: '₹',
  };
  
  return `${symbols[currency]}${amount.toFixed(2)}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return formatDate(dateString);
};
