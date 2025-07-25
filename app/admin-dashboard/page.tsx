"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import {
  Users,
  GraduationCap,
  DollarSign,
  BookOpen,
  AlertTriangle,
  BarChart3,
  Settings,
  UserPlus,
  FileText,
  Bell,
  TrendingUp,
  Shield,
  Calendar,
} from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"
import { ModernDashboardLayout } from "@/components/modern-dashboard-layout"
import { useAuth } from "@/lib/auth-context"
import { motion } from "framer-motion"
import { toast } from "sonner"

export default function AdminDashboard() {
  const { user } = useAuth()
  const [selectedPeriod, setSelectedPeriod] = useState("current-term")
  const [newTeacherCode, setNewTeacherCode] = useState("")

  const stats = {
    totalStudents: 1247,
    totalTeachers: 87,
    totalRevenue: 45600000,
    pendingPayments: 156,
    activeExams: 12,
    systemAlerts: 3,
  }

  const recentActivities = [
    { type: "user", description: "New student registered: John Doe (JSS1A)", time: "5 min ago", status: "success" },
    { type: "exam", description: "Mathematics CBT completed by SS2A", time: "15 min ago", status: "info" },
    { type: "payment", description: "Payment approved for 23 students", time: "1 hour ago", status: "success" },
    { type: "alert", description: "Server maintenance scheduled", time: "2 hours ago", status: "warning" },
  ]

  const pendingApprovals = [
    { type: "teacher", name: "Mrs. Sarah Johnson", subject: "Mathematics", status: "pending" },
    { type: "payment", name: "Student Fee Payment", amount: "₦45,000", status: "pending" },
    { type: "announcement", name: "Mid-term Break Notice", department: "Academic", status: "pending" },
  ]

  const generateTeacherCode = () => {
    const code = "TCH" + Math.random().toString(36).substr(2, 6).toUpperCase()
    setNewTeacherCode(code)
    toast.success("Teacher code generated successfully!")
  }

  const copyTeacherCode = () => {
    navigator.clipboard.writeText(newTeacherCode)
    toast.success("Teacher code copied to clipboard!")
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <ModernDashboardLayout
        title="Admin Dashboard"
        subtitle="Complete school management and oversight"
        actions={
          <div className="flex space-x-3">
            <Button
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-105"
              variant="outline"
            >
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button className="bg-white hover:bg-gray-100 text-blue-800 hover:text-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        }
      >
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Total Students</p>
                    <p className="text-3xl font-bold">{stats.totalStudents.toLocaleString()}</p>
                    <p className="text-blue-100 text-xs mt-1">+12% from last term</p>
                  </div>
                  <Users className="h-12 w-12 text-blue-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Total Teachers</p>
                    <p className="text-3xl font-bold">{stats.totalTeachers}</p>
                    <p className="text-green-100 text-xs mt-1">+3 new this month</p>
                  </div>
                  <GraduationCap className="h-12 w-12 text-green-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm font-medium">Revenue (₦)</p>
                    <p className="text-3xl font-bold">{(stats.totalRevenue / 1000000).toFixed(1)}M</p>
                    <p className="text-yellow-100 text-xs mt-1">+8% this term</p>
                  </div>
                  <DollarSign className="h-12 w-12 text-yellow-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm font-medium">Pending Items</p>
                    <p className="text-3xl font-bold">{stats.pendingPayments}</p>
                    <p className="text-red-100 text-xs mt-1">Requires attention</p>
                  </div>
                  <AlertTriangle className="h-12 w-12 text-red-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur-xl shadow-lg">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              User Management
            </TabsTrigger>
            <TabsTrigger
              value="academics"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              Academics
            </TabsTrigger>
            <TabsTrigger
              value="finances"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              Finances
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card className="bg-white/80 backdrop-blur-xl shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2 text-blue-600" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div
                          className={`w-3 h-3 rounded-full ${
                            activity.status === "success"
                              ? "bg-green-500"
                              : activity.status === "warning"
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pending Approvals */}
              <Card className="bg-white/80 backdrop-blur-xl shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-yellow-600" />
                    Pending Approvals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingApprovals.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 border border-yellow-200"
                      >
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">{item.subject || item.amount || item.department}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300 transform hover:scale-105"
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 transition-all duration-300 bg-transparent"
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-xl shadow-xl border-0">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="h-24 flex flex-col items-center justify-center space-y-2 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <Users className="h-8 w-8" />
                    <span className="text-sm font-medium">Add Student</span>
                  </Button>
                  <Button className="h-24 flex flex-col items-center justify-center space-y-2 bg-green-600 hover:bg-green-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <GraduationCap className="h-8 w-8" />
                    <span className="text-sm font-medium">Add Teacher</span>
                  </Button>
                  <Button className="h-24 flex flex-col items-center justify-center space-y-2 bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <BookOpen className="h-8 w-8" />
                    <span className="text-sm font-medium">Create Class</span>
                  </Button>
                  <Button className="h-24 flex flex-col items-center justify-center space-y-2 bg-yellow-600 hover:bg-yellow-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <BarChart3 className="h-8 w-8" />
                    <span className="text-sm font-medium">View Reports</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Generate Teacher Code */}
              <Card className="bg-white/80 backdrop-blur-xl shadow-xl border-0">
                <CardHeader>
                  <CardTitle>Generate Teacher Code</CardTitle>
                  <CardDescription>Create access codes for new teachers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={generateTeacherCode}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Generate New Teacher Code
                  </Button>
                  {newTeacherCode && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium text-blue-800">Teacher Code</Label>
                          <p className="text-lg font-mono font-bold text-blue-900">{newTeacherCode}</p>
                        </div>
                        <Button
                          size="sm"
                          onClick={copyTeacherCode}
                          className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105"
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* User Statistics */}
              <Card className="bg-white/80 backdrop-blur-xl shadow-xl border-0">
                <CardHeader>
                  <CardTitle>User Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Active Students</span>
                      <span className="font-bold text-blue-600">1,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Active Teachers</span>
                      <span className="font-bold text-green-600">87</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Pending Approvals</span>
                      <span className="font-bold text-yellow-600">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Parent Accounts</span>
                      <span className="font-bold text-purple-600">892</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="academics" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-xl shadow-xl border-0">
              <CardHeader>
                <CardTitle>Academic Management</CardTitle>
                <CardDescription>Manage classes, subjects, and academic calendar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Button className="h-32 flex flex-col items-center justify-center space-y-3 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <BookOpen className="h-12 w-12" />
                    <span className="font-medium">Manage Classes</span>
                  </Button>
                  <Button className="h-32 flex flex-col items-center justify-center space-y-3 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <Calendar className="h-12 w-12" />
                    <span className="font-medium">Academic Calendar</span>
                  </Button>
                  <Button className="h-32 flex flex-col items-center justify-center space-y-3 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <TrendingUp className="h-12 w-12" />
                    <span className="font-medium">Performance Analytics</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="finances" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-xl shadow-xl border-0">
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
                <CardDescription>Monitor school finances and payment status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <DollarSign className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Financial Management</h3>
                  <p className="text-gray-600 mb-6">Comprehensive financial tracking and reporting</p>
                  <Button className="bg-yellow-600 hover:bg-yellow-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Access Financial Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-xl shadow-xl border-0">
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure school settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">System Configuration</h3>
                  <p className="text-gray-600 mb-6">Manage system settings and configurations</p>
                  <Button className="bg-gray-600 hover:bg-gray-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Open Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </ModernDashboardLayout>
    </ProtectedRoute>
  )
}
