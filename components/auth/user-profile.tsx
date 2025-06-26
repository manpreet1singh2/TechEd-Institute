"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Calendar, BookOpen, LogOut, Settings } from "lucide-react"
import { getCurrentUser, logout } from "@/lib/auth-utils"

interface UserProfileProps {
  onLogout: () => void
}

export default function UserProfile({ onLogout }: UserProfileProps) {
  const [user, setUser] = useState<any>(null)
  const [enrolledCourses] = useState([
    { id: 1, name: "Software Development", progress: 75, status: "In Progress" },
    { id: 2, name: "Data Science & Machine Learning", progress: 100, status: "Completed" },
    { id: 3, name: "Cloud & DevOps", progress: 30, status: "In Progress" },
  ])

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
  }, [])

  const handleLogout = () => {
    logout()
    onLogout()
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-gray-500">Please log in to view your profile</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">{user.username}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </CardDescription>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4" />
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </CardDescription>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Enrolled Courses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            My Courses
          </CardTitle>
          <CardDescription>Track your learning progress and continue your journey</CardDescription>
        </CardHeader>
        <CardContent>
          {enrolledCourses.length > 0 ? (
            <div className="space-y-4">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{course.name}</h3>
                    <Badge variant={course.status === "Completed" ? "default" : "secondary"}>{course.status}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline">
                      {course.status === "Completed" ? "Review" : "Continue"}
                    </Button>
                    <Button size="sm" variant="ghost">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet</p>
              <Button>Browse Courses</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">{enrolledCourses.length}</div>
            <div className="text-sm text-gray-600">Courses Enrolled</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {enrolledCourses.filter((c) => c.status === "Completed").length}
            </div>
            <div className="text-sm text-gray-600">Courses Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(enrolledCourses.reduce((acc, c) => acc + c.progress, 0) / enrolledCourses.length) || 0}%
            </div>
            <div className="text-sm text-gray-600">Average Progress</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
