"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Award, ArrowRight } from "lucide-react"

export default function CoursesPreview() {
  const featuredCourses = [
    {
      id: 1,
      title: "Software Development",
      category: "Technology",
      description:
        "Master full-stack development with modern frameworks, industry best practices, and real-world projects that prepare you for a successful career in software engineering.",
      duration: "6 Months",
      students: "2,500+",
      rating: "4.9",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Data Science & Machine Learning",
      category: "Technology",
      description:
        "Learn to analyze complex data and build intelligent systems using Python, advanced ML algorithms, and industry-standard tools for data-driven decision making.",
      duration: "6 Months",
      students: "1,800+",
      rating: "4.8",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 3,
      title: "Artificial Intelligence & Deep Learning",
      category: "Technology",
      description:
        "Dive deep into AI and neural networks with TensorFlow, exploring cutting-edge techniques in computer vision, NLP, and advanced machine learning.",
      duration: "6 Months",
      students: "1,200+",
      rating: "4.9",
      color: "from-purple-500 to-violet-500",
    },
    {
      id: 4,
      title: "Cloud & DevOps",
      category: "Technology",
      description:
        "Master cloud infrastructure and DevOps practices with AWS, Docker, Kubernetes, and CI/CD pipelines for scalable application deployment.",
      duration: "3 Months",
      students: "1,500+",
      rating: "4.7",
      color: "from-orange-500 to-red-500",
    },
    {
      id: 5,
      title: "Cybersecurity",
      category: "Technology",
      description:
        "Learn ethical hacking, security practices, and threat detection to protect digital assets and build secure systems in today's digital landscape.",
      duration: "3 Months",
      students: "900+",
      rating: "4.8",
      color: "from-red-500 to-pink-500",
    },
    {
      id: 6,
      title: "Digital Marketing",
      category: "Marketing",
      description:
        "Master online marketing strategies, SEO, social media marketing, and digital advertising to grow businesses through effective digital channels.",
      duration: "3 Months",
      students: "2,000+",
      rating: "4.6",
      color: "from-indigo-500 to-blue-500",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Our Professional Courses</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Choose from our comprehensive range of industry-focused courses designed to accelerate your career and
            transform your future in technology and management.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredCourses.map((course) => (
            <Card
              key={course.id}
              className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 shadow-lg overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${course.color}`} />
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 font-medium">
                    {course.category}
                  </Badge>
                  <div className="flex items-center text-sm text-amber-600">
                    <Award className="w-4 h-4 mr-1" />
                    <span className="font-semibold">{course.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-2xl text-gray-900 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6 leading-relaxed">{course.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center bg-gray-50 px-3 py-2 rounded-full">
                    <Clock className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex items-center bg-gray-50 px-3 py-2 rounded-full">
                    <Users className="w-4 h-4 mr-2 text-green-600" />
                    <span className="font-medium">{course.students}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full group-hover:border-blue-600 group-hover:text-blue-600 transition-colors"
                    onClick={() => {
                      const modal = document.getElementById("course-details-modal")
                      if (modal) modal.style.display = "flex"
                    }}
                  >
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

        <div className="text-center">
          <Link href="/courses">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              View All 11 Courses
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
