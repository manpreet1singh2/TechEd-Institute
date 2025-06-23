import { Card, CardContent } from "@/components/ui/card"
import { Users, BookOpen, Award, Clock, Briefcase, Target } from "lucide-react"

export default function WhyChooseUs() {
  const features = [
    {
      icon: Users,
      title: "Expert Instructors",
      description:
        "Learn from industry professionals with 10+ years of real-world experience and expertise in cutting-edge technologies.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: BookOpen,
      title: "Hands-on Projects",
      description:
        "Build 15+ real-world projects using industry-standard tools and cutting-edge technologies that showcase your skills to employers.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Award,
      title: "Industry Certifications",
      description:
        "Earn globally recognized certifications that validate your skills and significantly boost your career prospects and earning potential.",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: Clock,
      title: "Flexible Durations",
      description:
        "Choose from multiple duration options (6 months, 3 months, or 45 days) designed to fit your schedule and learning pace.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Briefcase,
      title: "Placement Assistance",
      description:
        "Get comprehensive career support with our 90% placement rate, resume building, interview preparation, and industry connections.",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Target,
      title: "Job-Ready Skills",
      description:
        "Master the exact skills and technologies that top companies are hiring for, with curriculum updated quarterly based on industry trends.",
      color: "from-indigo-500 to-blue-500",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Why Choose TechEd Institute?</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We provide the perfect blend of theoretical knowledge and practical skills to make you industry-ready. Join
            thousands of successful graduates who have transformed their careers with us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group text-center p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 shadow-lg overflow-hidden"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color}`} />
              <CardContent className="p-0">
                <div
                  className={`bg-gradient-to-r ${feature.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white p-12 rounded-3xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold mb-2">100,000+</h3>
              <p className="text-blue-100">Students Trained</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">90%</h3>
              <p className="text-blue-100">Placement Rate</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">500+</h3>
              <p className="text-blue-100">Hiring Partners</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">4.8/5</h3>
              <p className="text-blue-100">Student Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
