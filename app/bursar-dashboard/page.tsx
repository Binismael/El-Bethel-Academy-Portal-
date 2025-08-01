"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CreditCard,
  FileText,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  AlertTriangle,
  Download,
  Upload,
  DollarSign,
  Calculator,
  PieChart,
  Receipt,
} from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"
import { ModernDashboardLayout } from "@/components/modern-dashboard-layout"
import { useAuth } from "@/lib/auth-context"
import { motion } from "framer-motion"
import { toast } from "sonner"

export default function BursarDashboard() {
  const { user } = useAuth()
  const [selectedPeriod, setSelectedPeriod] = useState("current-term")

  const financialData = {
    totalRevenue: 45600000,
    pendingPayments: 156,
    completedPayments: 1091,
    defaulters: 23,
    collectionRate: 87.5,
    monthlyTarget: 52000000,
  }

  const recentPayments = [
    { student: "John Doe", class: "SS1A", amount: 45000, status: "pending", date: "2024-01-10", receipt: "RCP001" },
    { student: "Jane Smith", class: "JSS3B", amount: 42000, status: "approved", date: "2024-01-09", receipt: "RCP002" },
    { student: "Mike Johnson", class: "SS2A", amount: 47000, status: "pending", date: "2024-01-08", receipt: "RCP003" },
    {
      student: "Sarah Wilson",
      class: "JSS2C",
      amount: 40000,
      status: "rejected",
      date: "2024-01-07",
      receipt: "RCP004",
    },
  ]

  const paymentSummary = [
    { class: "JSS1", total: 320, paid: 298, pending: 22, amount: 12600000, percentage: 93 },
    { class: "JSS2", total: 315, paid: 289, pending: 26, amount: 12150000, percentage: 92 },
    { class: "JSS3", total: 298, paid: 275, pending: 23, amount: 11920000, percentage: 92 },
    { class: "SS1", total: 285, paid: 251, pending: 34, amount: 11970000, percentage: 88 },
    { class: "SS2", total: 267, paid: 238, pending: 29, amount: 11970000, percentage: 89 },
    { class: "SS3", total: 245, paid: 225, pending: 20, amount: 11515000, percentage: 92 },
  ]

  const approvePayment = (index: number) => {
    toast.success("Payment approved successfully!")
  }

  const rejectPayment = (index: number) => {
    toast.error("Payment rejected")
  }

  const generateReport = () => {
    toast.success("Financial report generated successfully!")
  }

  return (
    <ProtectedRoute allowedRoles={["bursar"]}>
      <ModernDashboardLayout
        title="Bursar Dashboard"
        subtitle="Financial management and payment oversight"
        actions={
          <div className="flex space-x-3">
            <Button
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-105"
              variant="outline"
              onClick={generateReport}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button className="bg-white hover:bg-gray-100 text-blue-800 hover:text-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <Upload className="h-4 w-4 mr-2" />
              Bulk Upload
            </Button>
          </div>
        }
      >
        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Total Revenue</p>
                    <p className="text-2xl font-bold">₦{(financialData.totalRevenue / 1000000).toFixed(1)}M</p>
                    <p className="text-green-100 text-xs mt-1">+8% this term</p>
                  </div>
                  <TrendingUp className="h-10 w-10 text-green-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Completed</p>
                    <p className="text-2xl font-bold">{financialData.completedPayments}</p>
                    <p className="text-blue-100 text-xs mt-1">Payments processed</p>
                  </div>
                  <CheckCircle className="h-10 w-10 text-blue-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm font-medium">Pending</p>
                    <p className="text-2xl font-bold">{financialData.pendingPayments}</p>
                    <p className="text-yellow-100 text-xs mt-1">Awaiting review</p>
                  </div>
                  <Clock className="h-10 w-10 text-yellow-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm font-medium">Defaulters</p>
                    <p className="text-2xl font-bold">{financialData.defaulters}</p>
                    <p className="text-red-100 text-xs mt-1">Need follow-up</p>
                  </div>
                  <AlertTriangle className="h-10 w-10 text-red-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Collection Rate</p>
                    <p className="text-2xl font-bold">{financialData.collectionRate}%</p>
                    <p className="text-purple-100 text-xs mt-1">Above target</p>
                  </div>
                  <CreditCard className="h-10 w-10 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="payments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-xl shadow-lg">
            <TabsTrigger
              value="payments"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              Payment Review
            </TabsTrigger>
            <TabsTrigger
              value="summary"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              Class Summary
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              Reports
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              Fee Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="payments" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Recent Payment Submissions</h3>
                <p className="text-gray-600">Review and approve student payment proofs</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="bg-white/50 hover:bg-white/80 text-blue-900 hover:text-blue-900 border-blue-300 hover:border-blue-400 transition-all duration-300 transform hover:scale-105"
                  onClick={generateReport}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <Upload className="h-4 w-4 mr-2" />
                  Bulk Upload
                </Button>
              </div>
            </div>

            <Card className="bg-white/80 backdrop-blur-xl shadow-xl border-0">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Student
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Class
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentPayments.map((payment, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{payment.student}</div>
                            <div className="text-sm text-gray-500">{payment.receipt}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{payment.class}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">₦{payment.amount.toLocaleString()}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{payment.date}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge
                              className={
                                payment.status === "approved"
                                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                                  : payment.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                    : "bg-red-100 text-red-800 hover:bg-red-200"
                              }
                            >
                              {payment.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {payment.status === "pending" && (
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105"
                                >
                                  View
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300 transform hover:scale-105"
                                  onClick={() => approvePayment(index)}
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-red-600 hover:bg-red-700 text-white transition-all duration-300 transform hover:scale-105"
                                  onClick={() => rejectPayment(index)}
                                >
                                  Reject
                                </Button>
                              </div>
                            )}
                            {payment.status !== "pending" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-white/50 hover:bg-white/80 text-blue-900 hover:text-blue-900 border-blue-300 hover:border-blue-400 transition-all duration-300"
                              >
                                View
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="summary" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-xl shadow-xl border-0">
              <CardHeader>
                <CardTitle>Payment Summary by Class</CardTitle>
                <CardDescription>Overview of payment status across all classes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentSummary.map((classData, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{classData.class}</h4>
                          <p className="text-sm text-gray-600">{classData.total} students</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Paid</p>
                          <p className="font-medium text-green-600">{classData.paid}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Pending</p>
                          <p className="font-medium text-yellow-600">{classData.pending}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Amount</p>
                          <p className="font-medium text-gray-900">₦{(classData.amount / 1000000).toFixed(1)}M</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Rate</p>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${classData.percentage}%` }}
                              ></div>
                            </div>
                            <span className="font-medium text-blue-600 text-sm">{classData.percentage}%</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-xl shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-600" />
                    Financial Reports
                  </CardTitle>
                  <CardDescription>Generate comprehensive financial reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button
                      className="w-full justify-start bg-white hover:bg-blue-50 text-blue-900 hover:text-blue-900 border border-blue-200 hover:border-blue-300 transition-all duration-300 transform hover:scale-105"
                      variant="outline"
                      onClick={generateReport}
                    >
                      <Receipt className="h-4 w-4 mr-2" />
                      Monthly Revenue Report
                    </Button>
                    <Button
                      className="w-full justify-start bg-white hover:bg-yellow-50 text-yellow-900 hover:text-yellow-900 border border-yellow-200 hover:border-yellow-300 transition-all duration-300 transform hover:scale-105"
                      variant="outline"
                      onClick={generateReport}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Outstanding Payments Report
                    </Button>
                    <Button
                      className="w-full justify-start bg-white hover:bg-green-50 text-green-900 hover:text-green-900 border border-green-200 hover:border-green-300 transition-all duration-300 transform hover:scale-105"
                      variant="outline"
                      onClick={generateReport}
                    >
                      <PieChart className="h-4 w-4 mr-2" />
                      Class-wise Collection Report
                    </Button>
                    <Button
                      className="w-full justify-start bg-white hover:bg-red-50 text-red-900 hover:text-red-900 border border-red-200 hover:border-red-300 transition-all duration-300 transform hover:scale-105"
                      variant="outline"
                      onClick={generateReport}
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Defaulters Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-xl shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                    AI Financial Analytics
                  </CardTitle>
                  <CardDescription>Smart insights and predictions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">Collection Trend</h4>
                      <p className="text-sm text-green-700">15% improvement in payment collection this term</p>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Prediction</h4>
                      <p className="text-sm text-blue-700">Expected 92% collection rate by term end</p>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-medium text-yellow-900 mb-2">Recommendation</h4>
                      <p className="text-sm text-yellow-700">Send reminders to 23 students with overdue payments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-xl shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="h-5 w-5 mr-2 text-blue-600" />
                  Fee Structure Management
                </CardTitle>
                <CardDescription>Configure school fees and payment settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <DollarSign className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Fee Configuration</h3>
                  <p className="text-gray-600 mb-6">Set up and manage fee structures for different classes</p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Configure Fees
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
