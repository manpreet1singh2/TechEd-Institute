import CoursesGrid from "@/components/courses-grid"
import CourseDetailsModal from "@/components/course-details-modal"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Professional Training Courses - TechEd Institute",
  description:
    "Explore our 11 professional training courses in Software Development, Data Science, AI, Cloud Computing, Cybersecurity, and more.",
  keywords: "software development courses, data science training, AI courses, cloud computing, cybersecurity training",
}

export default function CoursesPage() {
  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Professional Training Courses</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive range of industry-focused courses designed to accelerate your career in
            technology and management.
          </p>
        </div>
        <CoursesGrid />
        <CourseDetailsModal />
      </div>
    </main>
  )
}
