"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  FileText,
  Users,
  Activity,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  MessageSquare,
  Share2,
  Download,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAdmin } from "@/contexts/AdminContext";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  onValue,
  get,
} from "@/lib/firebase";

// Overview content component
function OverviewContent() {
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    activeUsers: 0,
    crisisAlerts: 0,
    resolvedCases: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const db = getDatabase();
        const submissionsRef = query(ref(db, "submissions"));
        const usersRef = query(ref(db, "users"));
        const alertsRef = query(ref(db, "crisisAlerts"), orderByChild("status"), equalTo("active"));
        const resolvedRef = query(ref(db, "crisisAlerts"), orderByChild("status"), equalTo("resolved"));

        // Fetch all data in parallel
        const [submissionsSnap, usersSnap, alertsSnap, resolvedSnap] = await Promise.all([
          get(submissionsRef),
          get(usersRef),
          get(alertsRef),
          get(resolvedRef),
        ]);

        setStats({
          totalSubmissions: submissionsSnap.exists() ? Object.keys(submissionsSnap.val()).length : 0,
          activeUsers: usersSnap.exists() ? Object.keys(usersSnap.val()).length : 0,
          crisisAlerts: alertsSnap.exists() ? Object.keys(alertsSnap.val()).length : 0,
          resolvedCases: resolvedSnap.exists() ? Object.keys(resolvedSnap.val()).length : 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent mx-auto"></div>
          <p className="text-blue-600">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-white border-blue-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">
              Total Submissions
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.totalSubmissions.toLocaleString()}</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% this month
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-white border-blue-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">
              Active Users
            </CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.activeUsers.toLocaleString()}</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8% this month
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-white border-blue-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">
              Crisis Alerts
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.crisisAlerts}</div>
            <p className="text-xs text-red-600 flex items-center mt-1">
              Requires attention
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-white border-blue-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">
              Resolved Cases
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.resolvedCases.toLocaleString()}</div>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              87% resolution rate
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

// Submissions content component
function SubmissionsContent() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const db = getDatabase();
        const submissionsRef = query(ref(db, "submissions"), orderByChild("createdAt"));
        const snapshot = await get(submissionsRef);

        if (snapshot.exists()) {
          const submissionsData = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...data,
          }));
          setSubmissions(submissionsData.reverse()); // Reverse to show newest first
        } else {
          setSubmissions([]);
        }
      } catch (error) {
        console.error("Error fetching submissions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const filteredSubmissions = useMemo(() => {
    if (!searchTerm) return submissions;
    return submissions.filter((sub) =>
      sub.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [submissions, searchTerm]);

  if (loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent mx-auto"></div>
          <p className="text-blue-600">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="bg-white border-blue-100">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-900">All Submissions</CardTitle>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search submissions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-blue-200 bg-blue-50 pl-10 text-gray-900 placeholder:text-blue-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2 rounded-md text-sm w-64"
          />
          <Button variant="outline" size="icon" className="border-blue-200 hover:bg-blue-50">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredSubmissions.map((submission) => (
            <motion.div
              key={submission.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between p-4 rounded-lg bg-blue-50"
            >
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 font-medium truncate">{submission.content}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(submission.createdAt).toLocaleDateString()}
                  </span>
                  <span>Stress Level: {submission.stressLevel}/10</span>
                  <span className="capitalize">{submission.status}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-100">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-100">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
          {filteredSubmissions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No submissions yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Users content component
function UsersContent() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const db = getDatabase();
        const usersRef = query(ref(db, "users"));
        const snapshot = await get(usersRef);

        if (snapshot.exists()) {
          const usersData = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...data,
          }));
          setUsers(usersData);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent mx-auto"></div>
          <p className="text-blue-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="bg-white border-blue-100">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-gray-900">User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between p-4 rounded-lg bg-blue-50"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                  {user.email?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <p className="text-gray-900 font-medium">{user.email}</p>
                  <p className="text-sm text-gray-600">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">{user.submissionCount} submissions</span>
                {user.status === "active" ? (
                  <Badge className="bg-green-100 text-green-700">Active</Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-700">{user.status}</Badge>
                )}
              </div>
            </motion.div>
          ))}
          {users.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No users yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Analytics content component
function AnalyticsContent() {
  const [loading, setLoading] = useState(true);

  // Generate mock analytics data for demonstration
  const analyticsData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    submissions: [12, 19, 3, 5, 2, 3, 9],
    users: [8, 12, 5, 8, 3, 5, 7],
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent mx-auto"></div>
          <p className="text-blue-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="bg-white border-blue-100">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-gray-900">Platform Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {/* Chart placeholder */}
          <div className="h-64 flex items-center justify-center bg-blue-50 rounded-lg border-2 border-dashed border-blue-200">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-blue-400 mx-auto mb-2" />
              <p className="text-blue-600 font-medium">Analytics Dashboard</p>
              <p className="text-sm text-muted-foreground">Interactive charts coming soon</p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Submissions</p>
              <p className="text-2xl font-bold text-blue-600">1,234</p>
              <p className="text-xs text-green-600 mt-1">+12% from last month</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-muted-foreground">Active Users</p>
              <p className="text-2xl font-bold text-blue-600">567</p>
              <p className="text-xs text-green-600 mt-1">+8% from last month</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper functions (mock implementations)
function equalTo(val) {
  return { __type: 'equalTo', val };
}

export default function AdminDashboardPage() {
  const { isAdminAuthenticated, isAdminLoading, admin, refreshAdminStatus } = useAdmin();
  const [activeTab, setActiveTab] = useState("overview");

  // Check admin status on mount
  useEffect(() => {
    if (!isAdminLoading && !isAdminAuthenticated) {
      // Redirect to login if not authenticated
      window.location.href = "/admin/login";
    }
  }, [isAdminLoading, isAdminAuthenticated]);

  // Handle logout
  const handleLogout = async () => {
    try {
      // Implement logout logic if needed
      console.log("Logging out...");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isAdminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent mx-auto"></div>
          <p className="text-blue-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return null; // Will redirect to login
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "submissions", label: "Submissions", icon: FileText },
    { id: "users", label: "Users", icon: Users },
    { id: "analytics", label: "Analytics", icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      {/* Header */}
      <header className="border-b border-blue-100 bg-white/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">SILENT STRESS Admin Panel</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {admin?.email}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="container mx-auto px-4 py-2">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "text-blue-600 hover:bg-blue-50 hover:text-blue-800"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && <OverviewContent />}
          {activeTab === "submissions" && <SubmissionsContent />}
          {activeTab === "users" && <UsersContent />}
          {activeTab === "analytics" && <AnalyticsContent />}
        </AnimatePresence>
      </main>
    </div>
  );
}
