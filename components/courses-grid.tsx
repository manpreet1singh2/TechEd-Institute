"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Filter, ArrowRight, BookOpen } from "lucide-react"

export default function CoursesGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedCourse, setSelectedCourse] = useState<any>(null)

  const courses = [
    {
      id: 1,
      title: "Software Development",
      category: "Technology",
      description:
        "Industrial training program blending theoretical and practical learning for software development with modern frameworks, industry best practices, and real-world project experience.",
      duration: ["6 Months", "3 Months", "45 Days"],
      students: "2,500+",
      rating: "4.9",
      mode: "Online / Offline",
      targetAudience: "B.Tech / BCA / MCA / Diploma students",
      certificate: "Yes (on successful completion)",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Data Science & Machine Learning",
      category: "Technology",
      description:
        "Foundation in data analysis, visualization, and ML with real-world datasets using Python, advanced algorithms, and industry-standard tools for data-driven insights.",
      duration: ["6 Months", "3 Months", "45 Days"],
      students: "1,800+",
      rating: "4.8",
      mode: "Online / Offline",
      targetAudience: "Engineering / Science graduates",
      certificate: "Yes (on successful completion)",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 3,
      title: "Artificial Intelligence & Deep Learning",
      category: "Technology",
      description:
        "Focus on AI and deep learning with neural networks and frameworks like TensorFlow for cutting-edge applications in computer vision, NLP, and advanced ML.",
      duration: ["6 Months", "3 Months", "45 Days"],
      students: "1,200+",
      rating: "4.9",
      mode: "Online / Offline",
      targetAudience: "CS / IT graduates with programming background",
      certificate: "Yes (on successful completion)",
      color: "from-purple-500 to-violet-500",
    },
    {
      id: 4,
      title: "Cloud & DevOps",
      category: "Technology",
      description:
        "Training in cloud infrastructure and DevOps practices for scalable, modern application deployment using AWS, Docker, Kubernetes, and CI/CD pipelines.",
      duration: ["6 Months", "3 Months", "45 Days"],
      students: "1,500+",
      rating: "4.7",
      mode: "Online / Offline",
      targetAudience: "IT professionals and developers",
      certificate: "Yes (on successful completion)",
      color: "from-orange-500 to-red-500",
    },
    {
      id: 5,
      title: "Cybersecurity",
      category: "Technology",
      description:
        "Core principles of cybersecurity, ethical hacking, and threat detection to protect digital assets and build secure systems in today's digital landscape.",
      duration: ["6 Months", "3 Months", "45 Days"],
      students: "900+",
      rating: "4.8",
      mode: "Online / Offline",
      targetAudience: "IT professionals and security enthusiasts",
      certificate: "Yes (on successful completion)",
      color: "from-red-500 to-pink-500",
    },
    {
      id: 6,
      title: "Mobile App Development",
      category: "Technology",
      description:
        "Develop native and cross-platform mobile apps using modern frameworks like Flutter and React Native, with focus on UI/UX and backend integration.",
      duration: ["6 Months", "3 Months", "45 Days"],
      students: "1,100+",
      rating: "4.7",
      mode: "Online / Offline",
      targetAudience: "Developers and programming enthusiasts",
      certificate: "Yes (on successful completion)",
      color: "from-indigo-500 to-blue-500",
    },
    {
      id: 7,
      title: "Programming Languages & Foundations",
      category: "Technology",
      description:
        "Build programming fundamentals across C, C++, Java, Python, JavaScript with strong foundation concepts, data structures, and algorithmic thinking.",
      duration: ["6 Months", "3 Months", "45 Days"],
      students: "2,200+",
      rating: "4.6",
      mode: "Online / Offline",
      targetAudience: "Beginners and students",
      certificate: "Yes (on successful completion)",
      color: "from-teal-500 to-green-500",
    },
    {
      id: 8,
      title: "Big Data & Analytics",
      category: "Technology",
      description:
        "Process and analyze large datasets with Hadoop and Spark for enterprise-level data solutions, including data visualization and business intelligence.",
      duration: ["6 Months", "3 Months", "45 Days"],
      students: "800+",
      rating: "4.8",
      mode: "Online / Offline",
      targetAudience: "Data professionals and analysts",
      certificate: "Yes (on successful completion)",
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: 9,
      title: "Testing & QA",
      category: "Technology",
      description:
        "Software testing and QA with manual and automation tools for ensuring application quality, including performance testing and test automation frameworks.",
      duration: ["6 Months", "3 Months", "45 Days"],
      students: "1,300+",
      rating: "4.5",
      mode: "Online / Offline",
      targetAudience: "QA professionals and developers",
      certificate: "Yes (on successful completion)",
      color: "from-pink-500 to-rose-500",
    },
    {
      id: 10,
      title: "Human Resource Management",
      category: "Management",
      description:
        "Comprehensive HRM principles and practices for modern workplace management, employee relations, recruitment strategies, and HR analytics.",
      duration: ["6 Months", "3 Months", "45 Days"],
      students: "1,600+",
      rating: "4.6",
      mode: "Online / Offline",
      targetAudience: "HR professionals and management graduates",
      certificate: "Yes (on successful completion)",
      color: "from-emerald-500 to-teal-500",
    },
    {
      id: 11,
      title: "Digital Marketing",
      category: "Marketing",
      description:
        "Strategies for online marketing campaigns including SEO, social media marketing, content marketing, email marketing, and digital advertising for business growth.",
      duration: ["6 Months", "3 Months", "45 Days"],
      students: "2,000+",
      rating: "4.6",
      mode: "Online / Offline",
      targetAudience: "Marketing professionals and entrepreneurs",
      certificate: "Yes (on successful completion)",
      color: "from-violet-500 to-purple-500",
    },
  ]

  const categories = ["All", "Technology", "Management", "Marketing"]

  const filteredCourses =
    selectedCategory === "All" ? courses : courses.filter((course) => course.category === selectedCategory)

  const openCourseModal = (course: any) => {
    setSelectedCourse(course)
    const modal = document.getElementById("course-details-modal")
    if (modal) modal.style.display = "flex"
  }

  return (
    <div>
      {/* Filter Section */}
      <div className="mb-12 bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-blue-600" />
            <span className="text-gray-700 font-semibold text-lg">Filter by category:</span>
          </div>
          <div className="flex gap-3 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                    : "hover:border-blue-600 hover:text-blue-600"
                }`}
              >
                {category}
                {category !== "All" && (
                  <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                    {courses.filter((c) => c.category === category).length}
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <Card
            key={course.id}
            className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 shadow-lg overflow-hidden"
          >
            <div className={`h-2 bg-gradient-to-r ${course.color}`} />
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-3">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 font-medium px-3 py-1">
                  {course.category}
                </Badge>
                <div className="flex items-center text-sm text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                  <Award className="w-4 h-4 mr-1" />
                  <span className="font-semibold">{course.rating}</span>
                </div>
              </div>
              <CardTitle className="text-2xl text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                {course.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6 leading-relaxed text-sm">{course.description}</p>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Duration Options:</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.duration.map((duration, index) => (
                      <Badge key={index} variant="outline" className="text-xs px-2 py-1">
                        {duration}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-500 bg-gray-50 px-3 py-2 rounded-full">
                    <Users className="w-4 h-4 mr-2 text-green-600" />
                    <span className="font-medium">{course.students}</span>
                  </div>
                  <div className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-full">{course.mode}</div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full group-hover:border-blue-600 group-hover:text-blue-600 transition-colors"
                  onClick={() => openCourseModal(course)}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  View Details
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  onClick={() => {
                    const modal = document.getElementById("apply-now-modal")
                    if (modal) modal.style.display = "flex"
                  }}
                >
                  Apply Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Results Summary */}
      <div className="mt-12 text-center">
        <p className="text-gray-600">
          Showing <span className="font-semibold text-blue-600">{filteredCourses.length}</span>
          {selectedCategory !== "All" && <span> {selectedCategory.toLowerCase()}</span>} courses
        </p>
      </div>
    </div>
  )
}
