"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  Brain,
  CheckCircle,
  PlusCircle,
  Eye,
  Award,
  MessageSquare,
  Upload,
} from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"
import { ModernDashboardLayout } from "@/components/modern-dashboard-layout"
import { useAuth } from "@/lib/auth-context"
import { motion } from "framer-motion"
import { toast } from "sonner"

export default function TeacherDashboard() {
  const { user } = useAuth()
  const [selectedClass, setSelectedClass] = useState("SS1A")

  const teacherData = {
    name: user?.fullName || "Mrs. Sarah Johnson",
    subject: "Mathematics",
    classes: ["SS1A", "SS1B", "SS2A"],
    totalStudents: 87,
  }

  const classes = [
    { name: "SS1A", students: 32, avgScore: 78, attendance: 94, assignments: 5, exams: 2 },
    { name: "SS1B", students: 28, avgScore: 82, attendance: 91, assignments: 4, exams: 3 },
    { name: "SS2A", students: 27, avgScore: 85, attendance: 96, assignments: 6, exams: 1 },
  ]

  const upcomingExams = [
    { class: "SS1A", subject: "Algebra", date: "2024-01-15", type: "CBT", questions: 40, duration: "90 min" },
    { class: "SS1B", subject: "Geometry", date: "2024-01-17", type: "CBT", questions: 35, duration: "75 min" },
    { class: "SS2A", subject: "Calculus", date: "2024-01-20", type: "CBT", questions: 45, duration: "120 min" },
  ]

  const recentSubmissions = [
    { student: "John Doe", assignment: "Quadratic Equations", class: "SS1A", score: 85, status: "graded" },
    { student: "Jane Smith", assignment: "Trigonometry", class: "SS1B", score: null, status: "pending" },
    { student: "Mike Johnson", assignment: "Calculus Basics", class: "SS2A", score: 92, status: "graded" },
    { student: "Sarah Wilson", assignment: "Algebra Review", class: "SS1A", score: null, status: "pending" },
  ]

  const createAssignment = () => {
    toast.success("Assignment created successfully!")
  }

  const createExam = () => {
    toast.success("CBT Exam created successfully!")
  }

  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <ModernDashboardLayout
        title="Teacher Dashboard"
        subtitle={`Welcome back, ${teacherData.name} • ${teacherData.subject} Department`}
        actions={
          <div className="flex space-x-3">
            <Button
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-105"
              variant="outline"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Results
            </Button>
            <Button
              className="bg-white hover:bg-gray-100 text-blue-800 hover:text-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              onClick={createAssignment}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              New Assignment
            </Button>
          </div>
        }
      >
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Total Students</p>
                    <p className="text-3xl font-bold">{teacherData.totalStudents}</p>
                    <p className="text-blue-100 text-xs mt-1">Across {teacherData.classes.length} classes</p>
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
                    <p className="text-green-100 text-sm font-medium">Active Classes</p>
                    <p className="text-3xl font-bold">{teacherData.classes.length}</p>
                    <p className="text-green-100 text-xs mt-1">{teacherData.subject}</p>
                  </div>
                  <BookOpen className="h-12 w-12 text-green-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm font-medium">Pending Exams</p>
                    <p className="text-3xl font-bold">{upcomingExams.length}</p>
                    <p className="text-yellow-100 text-xs mt-1">This week</p>
                  </div>
                  <Calendar className="h-12 w-12 text-yellow-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Avg. Performance</p>
                    <p className="text-3xl font-bold">82%</p>
                    <p className="text-purple-100 text-xs mt-1">+5% this term</p>
                  </div>
                  <TrendingUp className="h-12 w-12 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="classes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur-xl shadow-lg">
            <TabsTrigger
              value="classes"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              My Classes
            </TabsTrigger>
            <TabsTrigger
              value="assignments"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              Assignments
            </TabsTrigger>
            <TabsTrigger
              value="exams"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              CBT Exams
            </TabsTrigger>
            <TabsTrigger
              value="grading"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              Grading
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="classes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {classes.map((classItem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/80 backdrop-blur-xl shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {classItem.name}
                        <Badge className="bg-blue-100 text-blue-800">{classItem.students} students</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <p className="text-2xl font-bold text-green-600">{classItem.avgScore}%</p>
                            <p className="text-sm text-green-700">Avg Score</p>
                          </div>
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">{classItem.attendance}%</p>
                            <p className="text-sm text-blue-700">Attendance</p>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Assignments: {classItem.assignments}</span>
                          <span>Exams: {classItem.exams}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Class
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 bg-transparent"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Create Assignment */}
              <Card className="bg-white/80 backdrop-blur-xl shadow-xl border-0">
                <CardHeader>
                  <CardTitle>Create New Assignment</CardTitle>
                  <CardDescription>Design assignments for your students</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="assignmentTitle">Assignment Title</Label>
                    <Input
                      id="assignmentTitle"
                      placeholder="e.g., Quadratic Equations Practice"
                      className="bg-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="assignmentDescription">Description</Label>
                    <Textarea
                      id="assignmentDescription"
                      placeholder="Assignment instructions..."
                      className="bg-white/50"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input id="dueDate" type="date" className="bg-white/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxScore">Max Score</Label>
                      <Input id="maxScore" type="number" placeholder="100" className="bg-white/50" />
                    </div>
                  </div>
                  <Button
                    onClick={createAssignment}
                    className="w-full bg-green-600 hover:bg-green-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create Assignment
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Submissions */}
              <Card className="bg-white/80 backdrop-blur-xl shadow-xl border-0">
                <CardHeader>
                  <CardTitle>Recent Submissions</CardTitle>
                  <CardDescription>Latest assignment submissions from students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentSubmissions.map((submission, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div>
                          <p className="font-medium text-gray-900">{submission.student}</p>
                          <p className="text-sm text-gray-600">
                            {submission.assignment} • {submission.class}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {submission.status === "graded" ? (
                            <Badge className="bg-green-100 text-green-800">{submission.score}%</Badge>
                          ) : (
                            <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                              Pending
                            </Badge>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 bg-transparent"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="exams" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">CBT Examination System</h3>
                <p className="text-gray-600">Create, manage, and monitor computer-based tests</p>
              </div>
              <Button
                onClick={createExam}
                className="bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Create New Exam
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Exams */}
              <Card className="bg-white/80 backdrop-blur-xl shadow-xl border-0">
                <CardHeader>
                  <CardTitle>Upcoming Exams</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingExams.map((exam, index) => (
                      <div
                        key={index}
                        className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors duration-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{exam.subject}</h4>
                          <Badge className="bg-blue-100 text-blue-800">{exam.type}</Badge>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>
                            Class: {exam.class} • Date: {exam.date}
                          </p>
                          <p>
                            Questions: {exam.questions} • Duration: {exam.duration}
                          </p>
                        </div>
                        <div className="flex space-x-2 mt-3">
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105"
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300 transform hover:scale-105"
                          >
                            Start
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Question Generator */}
              <Card className="bg-white/80 backdrop-blur-xl shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-purple-600" />
                    AI Question Generator
                  </CardTitle>
                  <CardDescription>Generate questions automatically based on curriculum</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <h4 className="font-medium text-purple-900 mb-2">Smart Question Bank</h4>
                      <p className="text-sm text-purple-700 mb-3">
                        AI can generate questions based on your teaching topics and difficulty level
                      </p>
                      <Button
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 transform hover:scale-105"
                      >
                        Generate Questions
                      </Button>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">Auto-Grading</h4>
                      <p className="text-sm text-green-700 mb-3">
                        Automatic grading with detailed feedback for students
                      </p>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300 transform hover:scale-105"
                      >
                        Configure Grading
                      </Button>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Performance Analytics</h4>
                      <p className="text-sm text-blue-700 mb-3">Track student performance and identify learning gaps</p>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105"
                      >
                        View Analytics
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="grading" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-xl shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  Automated Grading System
                </CardTitle>
                <CardDescription>AI-powered grading with plagiarism detection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Smart Grading Assistant</h3>
                  <p className="text-gray-600 mb-6">Automated grading with AI-powered feedback generation</p>
                  <Button className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Access Grading Portal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-xl shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                  Teaching Analytics
                </CardTitle>
                <CardDescription>
                  Data-driven insights into student performance and teaching effectiveness
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Analytics Dashboard</h3>
                  <p className="text-gray-600 mb-6">Comprehensive analytics and performance insights</p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    View Analytics
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
