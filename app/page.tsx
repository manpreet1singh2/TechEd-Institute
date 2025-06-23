import HeroSlider from "@/components/hero-slider"
import CoursesPreview from "@/components/courses-preview"
import WhyChooseUs from "@/components/why-choose-us"
import ApplyNowModal from "@/components/apply-now-modal"

export default function HomePage() {
  return (
    <main>
      <HeroSlider />
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Welcome to TechEd Institute</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Welcome to TechEd Institute, your gateway to industry-ready skills in technology and management. Explore our
            11 cutting-edge courses designed for real-world success.
          </p>
        </div>
      </section>
      <CoursesPreview />
      <WhyChooseUs />
      <ApplyNowModal />
    </main>
  )
}
