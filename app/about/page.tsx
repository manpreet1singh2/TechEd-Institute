import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, BookOpen, TrendingUp, Target, Lightbulb } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us - TechEd Institute",
  description:
    "Learn about TechEd Institute's mission to empower students with job-ready skills through practical, project-based learning.",

  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-91158-13846",
    contactType: "customer service",
    email: "dimplebrar13@gmail.com",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Tech Street",
    addressLocality: "Innovation City",
    addressRegion: "TC",
    postalCode: "12345",
    addressCountry: "IN",
  },
}

export default function AboutPage() {
  const achievements = [
    { icon: Users, title: "100,000+", subtitle: "Students Trained", color: "text-blue-600" },
    { icon: Award, title: "90%", subtitle: "Placement Rate", color: "text-green-600" },
    { icon: BookOpen, title: "11", subtitle: "Professional Courses", color: "text-purple-600" },
    { icon: TrendingUp, title: "5+", subtitle: "Years of Excellence", color: "text-orange-600" },
  ]

  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description:
        "Empowering students with job-ready skills through practical, project-based learning that bridges the gap between academia and industry.",
    },
    {
      icon: Lightbulb,
      title: "Innovation-Focused",
      description:
        "We stay ahead of technology trends, ensuring our curriculum reflects the latest industry demands and emerging technologies.",
    },
    {
      icon: Users,
      title: "Student-Centric",
      description:
        "Every decision we make prioritizes student success, from flexible learning options to comprehensive career support.",
    },
  ]

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">About TechEd Institute</h1>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Empowering students with job-ready skills through practical, project-based learning.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                At TechEd Institute, we bridge the gap between academic learning and industry requirements. Our mission
                is to provide comprehensive, hands-on training that prepares students for successful careers in
                technology and management.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We believe in learning by doing. Our courses are designed with real-world projects, industry-standard
                tools, and expert mentorship to ensure our graduates are not just job-ready, but industry leaders of
                tomorrow.
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-8 rounded-2xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                To become the leading institute for professional technology and management training, recognized globally
                for producing industry-ready professionals who drive innovation and growth.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We envision a future where every student has access to world-class education that not only teaches
                technical skills but also fosters critical thinking, creativity, and leadership capabilities.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <value.icon className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Achievements</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <Card
                  key={index}
                  className="text-center p-8 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <CardContent className="p-0">
                    <achievement.icon className={`w-16 h-16 ${achievement.color} mx-auto mb-6`} />
                    <h3 className="text-4xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                    <p className="text-gray-600 font-medium">{achievement.subtitle}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-12 rounded-2xl">
            <h2 className="text-4xl font-bold text-center mb-12">Why Choose TechEd Institute?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Expert Instructors</h3>
                <p className="text-blue-100">Industry professionals with years of real-world experience</p>
              </div>
              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Hands-on Projects</h3>
                <p className="text-blue-100">Real-world projects using industry-standard tools</p>
              </div>
              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Industry Certifications</h3>
                <p className="text-blue-100">Recognized certifications that boost your career</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
