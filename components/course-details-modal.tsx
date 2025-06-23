"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, BookOpen, Clock, Users, Award, Target, CheckCircle, PlayCircle } from "lucide-react"

export default function CourseDetailsModal() {
  const closeModal = () => {
    const modal = document.getElementById("course-details-modal")
    if (modal) modal.style.display = "none"
  }

  // Sample course data - Software Development (most comprehensive example)
  const courseData = {
    title: "Software Development",
    overview:
      "Industrial training program blending theoretical and practical learning for software development with modern frameworks, industry best practices, and real-world project experience that prepares you for a successful career in software engineering.",
    duration: ["6 Months", "3 Months", "45 Days"],
    targetAudience: "B.Tech / BCA / MCA / Diploma students",
    mode: "Online / Offline",
    certificate: "Yes (on successful completion)",
    modules: [
      {
        week: 1,
        title: "Introduction & Foundations",
        topics: [
          "Introduction to Software Development",
          "Software Development Life Cycle (SDLC)",
          "Agile vs Waterfall Methodologies",
          "Git Version Control System",
          "Development Environment Setup",
        ],
      },
      {
        week: 2,
        title: "Programming Fundamentals",
        topics: [
          "Programming Languages (Java/Python/C#/JavaScript)",
          "Object-Oriented Programming Concepts",
          "Data Structures and Algorithms",
          "Code Quality and Best Practices",
          "Debugging and Testing Fundamentals",
        ],
      },
      {
        week: 3,
        title: "Front-End Development",
        topics: [
          "HTML5 & CSS3 Advanced Concepts",
          "JavaScript ES6+ Features",
          "React/Angular Framework",
          "Responsive Design Principles",
          "UI/UX Design Basics",
        ],
      },
      {
        week: 4,
        title: "Back-End Development",
        topics: [
          "Node.js/Django Framework",
          "RESTful API Development",
          "Database Design and Integration",
          "Authentication and Authorization",
          "Server-Side Architecture",
        ],
      },
      {
        week: 5,
        title: "Full Stack Integration",
        topics: [
          "Full Stack Application Development",
          "API Testing and Documentation",
          "Error Handling and Logging",
          "Performance Optimization",
          "Security Best Practices",
        ],
      },
      {
        week: 6,
        title: "Deployment & DevOps",
        topics: [
          "Cloud Deployment (AWS/Azure)",
          "CI/CD Pipeline Setup",
          "Final Project Development",
          "Portfolio Development",
          "Interview Preparation",
        ],
      },
    ],
    tools: ["Git", "VS Code", "React", "Node.js", "MySQL", "Firebase", "AWS", "Docker", "Postman"],
    assessment: "Weekly quizzes (20%), hands-on assignments (40%), final project presentation (40%)",
    outcomes: [
      "Build full-stack web applications from scratch",
      "Understand complete Software Development Life Cycle",
      "Master version control with Git and collaborative development",
      "Deploy applications to cloud platforms",
      "Implement security best practices",
      "Create professional developer portfolio",
    ],
    projects: [
      "E-commerce Web Application with Payment Integration",
      "Task Management System with Real-time Updates",
      "Social Media Dashboard with Analytics",
      "Personal Portfolio Website",
      "API-driven Mobile-responsive Application",
    ],
    careerPaths: [
      "Full Stack Developer",
      "Frontend Developer",
      "Backend Developer",
      "Software Engineer",
      "Web Developer",
    ],
  }

  return (
    <div
      id="course-details-modal"
      className="fixed inset-0 bg-black bg-opacity-50 z-50 hidden items-center justify-center p-4"
      style={{ display: "none" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal()
      }}
    >
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center p-8 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl sticky top-0">
          <div>
            <h2 className="text-3xl font-bold flex items-center">
              <BookOpen className="w-8 h-8 mr-3" />
              {courseData.title}
            </h2>
            <p className="text-blue-100 mt-2">Complete Course Details & Curriculum</p>
          </div>
          <button onClick={closeModal} className="text-white hover:text-gray-200 transition-colors">
            <X className="w-8 h-8" />
          </button>
        </div>

        <div className="p-8 space-y-10">
          {/* Course Overview */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Target className="w-6 h-6 mr-2 text-blue-600" />
              Course Overview
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">{courseData.overview}</p>
          </div>

          {/* Course Details Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Duration Options
              </h4>
              <div className="flex flex-wrap gap-2">
                {courseData.duration.map((duration, index) => (
                  <Badge key={index} className="bg-blue-100 text-blue-800 px-3 py-1">
                    {duration}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                <Users className="w-5 h-5 mr-2 text-green-600" />
                Target Audience
              </h4>
              <p className="text-gray-600">{courseData.targetAudience}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                <Award className="w-5 h-5 mr-2 text-purple-600" />
                Certificate
              </h4>
              <p className="text-gray-600">{courseData.certificate}</p>
            </div>
          </div>

          {/* Weekly Modules */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Weekly Curriculum</h3>
            <div className="space-y-4">
              {courseData.modules.map((module, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      {module.week}
                    </div>
                    {module.title}
                  </h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {module.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Technologies */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Tools & Technologies</h3>
            <div className="flex flex-wrap gap-3">
              {courseData.tools.map((tool, index) => (
                <Badge
                  key={index}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm"
                >
                  {tool}
                </Badge>
              ))}
            </div>
          </div>

          {/* Assessment */}
          <div className="bg-amber-50 p-6 rounded-xl border-l-4 border-amber-500">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Assessment Method</h3>
            <p className="text-gray-700 leading-relaxed">{courseData.assessment}</p>
          </div>

          {/* Learning Outcomes */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Learning Outcomes</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {courseData.outcomes.map((outcome, index) => (
                <div key={index} className="flex items-start bg-green-50 p-4 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Projects */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Sample Projects</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {courseData.projects.map((project, index) => (
                <div key={index} className="flex items-start bg-blue-50 p-4 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{project}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Career Paths */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Career Opportunities</h3>
            <div className="flex flex-wrap gap-3">
              {courseData.careerPaths.map((career, index) => (
                <Badge key={index} className="bg-green-100 text-green-800 px-4 py-2">
                  {career}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t-2 border-gray-100">
            <Button
              onClick={() => {
                closeModal()
                const applyModal = document.getElementById("apply-now-modal")
                if (applyModal) applyModal.style.display = "flex"
              }}
              className="flex-1 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-semibold"
            >
              <PlayCircle className="w-6 h-6 mr-2" />
              Apply for This Course
            </Button>
            <Button variant="outline" onClick={closeModal} className="flex-1 h-14 border-2 text-lg">
              Close Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
