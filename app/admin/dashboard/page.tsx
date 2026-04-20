"use client";

/**
 * Admin Dashboard Page - SILENT STRESS
 *
 * Comprehensive admin dashboard for managing the SILENT STRESS platform.
 * Features analytics, user management, and content moderation.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
  Users,
  MessageSquare,
  Shield,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
  Search,
  Filter,
  LogOut,
  BarChart3,
  Activity,
  Clock,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAdmin } from "@/contexts/AdminContext";
import { AdminProtectedRoute } from "@/components/secret-stress/AdminProtectedRoute";

// Mock data for dashboard
const mockStats = {
  totalSubmissions: 1247,
  activeUsers: 342,
  crisisAlerts: 12,
  resolvedCases: 1089,
  weeklyGrowth: 15.3,
  monthlyGrowth: 42.7,
};

const mockSubmissions = [
  {
    id: "1",
    content: "Academic pressure is overwhelming...",
    stressLevel: 8,
    date: "2024-01-15",
    status: "pending",
    tags: ["academic", "exams"],
  },
  {
    id: "2",
    content: "Feeling anxious about results...",
    stressLevel: 6,
    date: "2024-01-15",
    status: "reviewed",
    tags: ["anxiety", "results"],
  },
  {
    id: "3",
    content: "Need someone to talk to...",
    stressLevel: 9,
    date: "2024-01-14",
    status: "flagged",
    tags: ["crisis", "support"],
  },
];

const mockUsers = [
  { id: "1", username: "Student_001", submissions: 5, joined: "2024-01-01", status: "active" },
  { id: "2", username: "Student_002", submissions: 12, joined: "2024-01-05", status: "active" },
  { id: "3", username: "Student_003", submissions: 2, joined: "2024-01-10", status: "flagged" },
];

export default function AdminDashboardPage() {
  const { isAdminAuthenticated, isAdminLoading, admin, adminLogout } = useAdmin();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!isAdminLoading && !isAdminAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAdminAuthenticated, isAdminLoading, router]);

  const handleLogout = () => {
    adminLogout();
    router.push("/admin/login");
  };

  if (isAdminLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-blue-50">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent mx-auto"></div>
          <p className="text-blue-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-blue-50">
        {/* Header */}
        <header className="border-b border-blue-100 bg-white/80 backdrop-blur-xl sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gray-900">SILENT STRESS</span>
                </Link>
                <Badge variant="outline" className="border-blue-500/50 text-blue-600">
                  Admin Panel
                </Badge>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  Welcome, {admin?.email}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
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
                <div className="text-2xl font-bold text-gray-900">{mockStats.totalSubmissions.toLocaleString()}</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{mockStats.weeklyGrowth}% this week
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
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
                <div className="text-2xl font-bold text-gray-900">{mockStats.activeUsers.toLocaleString()}</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{mockStats.monthlyGrowth}% this month
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
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
                <div className="text-2xl font-bold text-gray-900">{mockStats.crisisAlerts}</div>
                <p className="text-xs text-red-600 flex items-center mt-1">
                  Requires attention
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
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
                <div className="text-2xl font-bold text-gray-900">{mockStats.resolvedCases.toLocaleString()}</div>
                <p className="text-xs text-gray-500 flex items-center mt-1">
                  87% resolution rate
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "submissions", label: "Submissions", icon: FileText },
            { id: "users", label: "Users", icon: Users },
            { id: "analytics", label: "Analytics", icon: Activity },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.id)}
              className={activeTab === tab.id 
                ? "bg-blue-600 hover:bg-blue-700" 
                : "text-blue-600 hover:text-blue-800 hover:bg-blue-50"}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "overview" && (
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-6 lg:grid-cols-2"
          >
            {/* Recent Submissions */}
            <Card className="bg-white border-blue-100">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center justify-between">
                  Recent Submissions
                  <Link href="/admin/dashboard/submissions" className="text-sm text-blue-600 hover:text-blue-800">
                    View All
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSubmissions.map((submission) => (
                    <div
                      key={submission.id}
                      className="flex items-start justify-between p-3 rounded-lg bg-blue-50"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 truncate">{submission.content}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            Level: {submission.stressLevel}/10
                          </Badge>
                          {submission.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {submission.status === "pending" && (
                          <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>
                        )}
                        {submission.status === "reviewed" && (
                          <Badge className="bg-green-100 text-green-700">Reviewed</Badge>
                        )}
                        {submission.status === "flagged" && (
                          <Badge className="bg-red-100 text-red-700">Flagged</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white border-blue-100">
              <CardHeader>
                <CardTitle className="text-gray-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300">
                    <Eye className="h-5 w-5 text-blue-600" />
                    <span className="text-sm">Review Pending</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <span className="text-sm">Crisis Alerts</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="text-sm">Manage Users</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300">
                    <Activity className="h-5 w-5 text-green-500" />
                    <span className="text-sm">View Analytics</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === "submissions" && (
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">All Submissions</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      placeholder="Search submissions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-slate-700/50 border-slate-600 text-white w-64"
                    />
                  </div>
                  <Button variant="outline" size="icon" className="border-slate-600">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30"
                  >
                    <div className="flex-1">
                      <p className="text-white">{submission.content}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {submission.date}
                        </span>
                        <span>Stress Level: {submission.stressLevel}/10</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "users" && (
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium">
                        {user.username.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.username}</p>
                        <p className="text-sm text-slate-400">Joined: {user.joined}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-slate-400">
                        {user.submissions} submissions
                      </span>
                      {user.status === "active" ? (
                        <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                      ) : (
                        <Badge className="bg-red-500/20 text-red-400">Flagged</Badge>
                      )}
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "analytics" && (
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Analytics Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-slate-400">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4 text-indigo-400" />
                  <p>Analytics dashboard coming soon</p>
                  <p className="text-sm mt-2">Track user engagement, stress trends, and platform usage</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
  );
}
