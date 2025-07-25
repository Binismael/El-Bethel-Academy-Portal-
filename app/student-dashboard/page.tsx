"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Calendar,
  CreditCard,
  MessageCircle,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Brain,
  Target,
} from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"
import { ModernDashboardLayout } from "@/components/modern-dashboard-layout"
import { useAuth } from "@/lib/auth-context"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function StudentDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user && user.role && user.role !== "student") {
      // Redirect non-students to their appropriate dashboard
      const redirectPath = `/${user.role}-dashboard`
      console.log(`Redirecting ${user.role} to ${redirectPath}`)
      router.push(redirectPath)
    }
  }, [user, router])

  const studentData = {
    name: user?.fullName || "Ogose Mmesoma",
    class: user?.class || "SS2A",
    regNo: user?.regNo || "EBS/2023/001",
    currentTerm: "First Term 2024/2025",
    overallGrade: "A",
    gpa: 4.57,
    position: "3rd",
    attendance: 95,
  }

  const subjects = [
    { name: "Mathematics", score: 85, grade: "A", trend: "up" },
    { name: "English Language", score: 78, grade: "B+", trend: "up" },
    { name: "Physics", score: 82, grade: "A-", trend: "stable" },
    { name: "Chemistry", score: 79, grade: "B+", trend: "down" },
    { name: "Biology", score: 88, grade: "A", trend: "up" },
    { name: "Further Mathematics", score: 75, grade: "B", trend: "up" },
  ]

  const upcomingExams = [
    { subject: "Mathematics", date: "2024-01-15", type: "CBT", duration: "2 hours" },
    { subject: "Physics", date: "2024-01-17", type: "CBT", duration: "1.5 hours" },
    { subject: "Chemistry", date: "2024-01-20", type: "Practical", duration: "3 hours" },
  ]

  const aiRecommendations = [
    {
      type: "study",
      title: "Focus on Organic Chemistry",
      description: "Your performance in organic chemistry topics needs improvement",
      action: "Start Practice",
    },
    {
      type: "strength",
      title: "Excellent in Calculus",
      description: "You're performing exceptionally well in calculus topics",
      action: "Advanced Problems",
    },
    {
      type: "reminder",
      title: "Physics Assignment Due",
      description: "Don't forget your physics assignment due tomorrow",
      action: "Submit Now",
    },
  ]

  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <ModernDashboardLayout
        title="Student Dashboard"
        subtitle={`Welcome back, ${studentData.name} • ${studentData.class} • ${studentData.regNo}`}
        actions={
          <div className="flex space-x-3">
            <Button
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-105"
              variant="outline"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              AI Tutor
            </Button>
            <Button className="bg-white hover:bg-gray-100 text-blue-800 hover:text-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <Target className="h-4 w-4 mr-2" />
              View Assignments
            </Button>
          </div>
        }
      >
        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{studentData.gpa}</div>
                  <p className="text-blue-100 text-sm">Current GPA</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{studentData.overallGrade}</div>
                  <p className="text-yellow-100 text-sm">Overall Grade</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{studentData.position}</div>
                  <p className="text-purple-100 text-sm">Class Position</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">95%</div>
                  <p className="text-green-100 text-sm">Attendance</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* AI Tutor Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="mb-8 bg-white/80 backdrop-blur-xl shadow-xl border-0">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-blue-700" />
                <CardTitle className="text-blue-900">AI Learning Assistant</CardTitle>
              </div>
              <CardDescription>Personalized recommendations and study guidance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aiRecommendations.map((rec, index) => (
                  <div key={index} className="p-4 border border-white/20 rounded-lg bg-white/40 backdrop-blur-sm">
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full mt-1 ${
                          rec.type === "study" ? "bg-red-500" : rec.type === "strength" ? "bg-green-500" : "bg-blue-500"
                        }`}
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-blue-900 mb-1">{rec.title}</h4>
                        <p className="text-sm text-gray-700 mb-3">{rec.description}</p>
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105"
                        >
                          {rec.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-100/50 backdrop-blur-sm rounded-lg border border-blue-200/30">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-8 w-8 text-blue-700" />
                  <div>
                    <h4 className="font-medium text-blue-900">Ask AI Tutor</h4>
                    <p className="text-sm text-blue-700">Get instant help with your studies</p>
                  </div>
                  <Button className="ml-auto bg-blue-800 hover:bg-blue-900 text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Chat Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Tabs defaultValue="academics" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-xl shadow-lg">
              <TabsTrigger
                value="academics"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
              >
                Academics
              </TabsTrigger>
              <TabsTrigger
                value="exams"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
              >
                Exams
              </TabsTrigger>
              <TabsTrigger
                value="payments"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
              >
                Payments
              </TabsTrigger>
              <TabsTrigger
                value="assignments"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
              >
                Assignments
              </TabsTrigger>
            </TabsList>

            <TabsContent value="academics" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-xl shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="text-blue-900">Subject Performance</CardTitle>
                  <CardDescription>Your current academic performance across all subjects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subjects.map((subject, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 border border-white/20 rounded-lg bg-white/40 backdrop-blur-sm hover:border-blue-300 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-center space-x-4">
                          <BookOpen className="h-6 w-6 text-blue-700" />
                          <div>
                            <h4 className="font-medium text-blue-900">{subject.name}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge
                                className={
                                  subject.grade.startsWith("A")
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {subject.grade}
                              </Badge>
                              <span className="text-sm text-gray-600">{subject.score}%</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TrendingUp
                            className={`h-4 w-4 ${
                              subject.trend === "up"
                                ? "text-green-500"
                                : subject.trend === "down"
                                  ? "text-red-500"
                                  : "text-gray-500"
                            }`}
                          />
                          <div className="w-20">
                            <Progress value={subject.score} className="h-2" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="exams" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white/80 backdrop-blur-xl shadow-xl border-0">
                  <CardHeader>
                    <CardTitle className="text-blue-900">Upcoming Exams</CardTitle>
                    <CardDescription>Your scheduled CBT and practical exams</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingExams.map((exam, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border border-white/20 rounded-lg bg-white/40 backdrop-blur-sm hover:border-blue-300 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-center space-x-3">
                            <Calendar className="h-5 w-5 text-blue-700" />
                            <div>
                              <h4 className="font-medium text-blue-900">{exam.subject}</h4>
                              <p className="text-sm text-gray-600">
                                {exam.date} • {exam.duration}
                              </p>
                            </div>
                          </div>
                          <Badge
                            className={
                              exam.type === "CBT" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {exam.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-xl shadow-xl border-0">
                  <CardHeader>
                    <CardTitle className="text-blue-900">Exam Preparation</CardTitle>
                    <CardDescription>AI-powered study recommendations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="font-medium text-green-800">Ready for Mathematics</span>
                        </div>
                        <p className="text-sm text-green-700">You've completed 85% of practice questions</p>
                      </div>

                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="h-5 w-5 text-yellow-600" />
                          <span className="font-medium text-yellow-800">Physics Needs Attention</span>
                        </div>
                        <p className="text-sm text-yellow-700">Focus on electromagnetic waves topic</p>
                      </div>

                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertCircle className="h-5 w-5 text-red-600" />
                          <span className="font-medium text-red-800">Chemistry Practice Needed</span>
                        </div>
                        <p className="text-sm text-red-700">Complete organic chemistry exercises</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="payments" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-xl shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="text-blue-900">Payment Status</CardTitle>
                  <CardDescription>Track your school fees and payment history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Management</h3>
                    <p className="text-gray-600 mb-4">View fees, upload payment proof, and track status</p>
                    <Button className="bg-blue-800 hover:bg-blue-900 text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      View Payment Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assignments" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-xl shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="text-blue-900">Assignments & Projects</CardTitle>
                  <CardDescription>Track your assignments and submission status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Assignment Tracker</h3>
                    <p className="text-gray-600 mb-4">Manage your assignments with AI-powered reminders</p>
                    <Button className="bg-blue-800 hover:bg-blue-900 text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      View Assignments
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </ModernDashboardLayout>
    </ProtectedRoute>
  )
}
